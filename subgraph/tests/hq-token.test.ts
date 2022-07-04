import { describe, test, newMockEvent, assert, clearStore } from "matchstick-as/assembly/index";
import { Bytes, ethereum, BigInt, Address,log } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../generated/HqToken/HqToken";
import { handleTransfer } from "../src/hq-token";
import { Transfer } from "../generated/schema"


function saveNewData():void {
    const hash = Bytes.fromHexString('0x4e831d501a0fc392bb9ce229ec2eeaf5feaabd65fc27f9041ff73aa0e0c7b464');
    const from = Address.fromString('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    const to = Address.fromString('0x9a705eEda44f392691eBAE3EF1801c754dEf260d');
    const value = BigInt.fromString('80000000008808008');
    let entity = new Transfer(hash.toHexString())
    entity.from = Bytes.fromHexString(from.toHexString());
    entity.to = Bytes.fromHexString(to.toHexString());
    entity.value = value;
    entity.save();

}


function newEthBolck():ethereum.Block {

    const hash = Bytes.fromHexString('0x4e831d501a0fc392bb9ce229ec2eeaf5feaabd65fc27f9041ff73aa0e0c7b464');
    const parentHash = Bytes.fromHexString('0x4e831d501a0fc392bb9ce229ec2eeaf5feaabd65fc27f9041ff73aa0e0c7b464');
    const uncleHash = Bytes.fromHexString('0x4e831d501a0fc392bb9ce229ec2eeaf5feaabd65fc27f9041ff73aa0e0c7b464');

    const stateRoot = Bytes.fromHexString('0x00');
    const transactionsRoot = Bytes.fromHexString('0x00');
    const receiptsRoot = Bytes.fromHexString('0x00'); 

    const blockNumber = BigInt.fromString('1');

    const from = Address.fromString('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');

    const gasUsed = BigInt.fromString("2");
    const gasLimit = BigInt.fromString("2");
    const timestamp = BigInt.fromString('1656903079708');
    const difficulty = BigInt.fromString('1');
    const totalDifficulty = BigInt.fromString('2');
    const size = BigInt.fromString('3');
    const baseFeePerGas = BigInt.fromString('5');

    let block = new ethereum.Block(hash,parentHash,uncleHash,from,
        stateRoot,transactionsRoot,receiptsRoot,blockNumber,gasUsed,gasLimit,timestamp,
        difficulty,totalDifficulty,size,baseFeePerGas);
    return block;
}

function newEthTx():ethereum.Transaction{
    
    const hash = Bytes.fromHexString('0x4e831d501a0fc392bb9ce229ec2eeaf5feaabd65fc27f9041ff73aa0e0c7b464');
    const index = BigInt.fromString('1');

    const from = Address.fromString('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    const to = Address.fromString('0x9a705eEda44f392691eBAE3EF1801c754dEf260d');
    const value = BigInt.fromString('0');

    const gasLimit = BigInt.fromString("2");
    const gasPrice = BigInt.fromString("5");
    // 这里要填了 transfer(to,amount)
    // const input = Bytes.fromHexString('0xa9059cbb0000000000000000000000009a705eEda44f392691eBAE3EF1801c754dEf260d00000000000000000000000000000000000000000000006c6b935b8bbd400000')
    const input = Bytes.fromHexString("0xa9059cbb0000000000000000000000009a705eEda44f392691eBAE3EF1801c754dEf260d00000000000000000000000000000000000000000000006c6b935b8bbd400000");
    const nonce = BigInt.fromString('1')

    let tx = new ethereum.Transaction(hash,index,from,to,value,gasLimit,gasPrice,input,nonce);
    return tx;
}

function newParamms():ethereum.EventParam[]{


    const fadr = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const tadr = '0x9a705eEda44f392691eBAE3EF1801c754dEf260d';
    const from = Address.fromString(fadr);
    const to = Address.fromString(tadr);
    const value = BigInt.fromString('2000000000000000000000');

    let params:ethereum.EventParam[] = [];
    let fromP = new ethereum.EventParam("from", ethereum.Value.fromAddress(from));
    let toP = new ethereum.EventParam("to", ethereum.Value.fromAddress(to));
    let valueP = new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value));

    params.push(fromP);
    params.push(toP);
    params.push(valueP);
    return params;
}
function newTransferEvent():TransferEvent {
    const from = Address.fromString('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    const logIndex = BigInt.fromString('1');
    const transactionLogIndex = BigInt.fromString('1');
    const logType = 'default_log_type';
    const block =  newEthBolck();
    const tx =  newEthTx();
    const parameters = newParamms();
    // const receipt = null;

    const event =  new TransferEvent(from,logIndex,transactionLogIndex,logType,block,tx,parameters,null);
    return event;
}


describe("handleTransfer()", () => {


    test("Transfer Custom Event", () => {
        // log.log(log.Level.INFO,'handleTransfer')

        const transferId = '0x4e831d501a0fc392bb9ce229ec2eeaf5feaabd65fc27f9041ff73aa0e0c7b464-1';
        const fadr = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        const tadr = '0x9a705eEda44f392691eBAE3EF1801c754dEf260d';
        const value = '2000000000000000000000';
        // Initialise event (this can be generalised into a separate function)

        let event =  newTransferEvent();
        handleTransfer(event);

    
        assert.fieldEquals('Transfer', transferId.toLowerCase() , 'id', transferId.toLowerCase())
        assert.fieldEquals('Transfer',transferId,'from',fadr.toLowerCase());
        assert.fieldEquals('Transfer',transferId,'to',tadr.toLowerCase());
        assert.fieldEquals('Transfer',transferId,'value',value);
        clearStore()

        // saveNewData();
        
    });

    test("Tranfser use newMockEvent() ",()=>{
        const fadr = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        const tadr = '0x9a705eEda44f392691eBAE3EF1801c754dEf260d';
        const value = '2000000000000000000000';

        // 使用mockEvent快速创建对象
        // changetype<>()  AssemblyScript 默认类型转换函数
        let tEvent = changetype<TransferEvent>(newMockEvent())
        tEvent.parameters = newParamms();
        handleTransfer(tEvent);

        const transferId = tEvent.transaction.hash.toHexString() + '-' + tEvent.logIndex.toString();

        // log.info(transferId,[])

        assert.fieldEquals('Transfer', transferId.toLowerCase() , 'id', transferId.toLowerCase())
        assert.fieldEquals('Transfer',transferId,'from',fadr.toLowerCase());
        assert.fieldEquals('Transfer',transferId,'to',tadr.toLowerCase());
        assert.fieldEquals('Transfer',transferId,'value',value);


        clearStore();
    });
})
