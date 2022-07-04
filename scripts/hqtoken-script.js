// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { BigNumber } = require("ethers");
const path = require('path');

const getArtifactPath = async function(contractName) {
  const artifact = await hre.artifacts.readArtifact(contractName)
  return path.join(hre.config.paths.artifacts, artifact.sourceName, `${artifact.contractName}.json`)
}

async function deployToken() {

  const HqToken = await hre.ethers.getContractFactory("HqToken");
  const hqToken = await HqToken.deploy("HqToken", "HQT", 18);
  await hqToken.deployed();
  const [main,other] = await ethers.getSigners();

  console.log("HqToken deployed to:", hqToken.address);

  let uint = BigNumber.from("1000000000000000000");

  let num = BigNumber.from("2022")
  let amount = num.mul(uint);
  let tx = await hqToken.mint(main.address,amount.toHexString());
  tx = await tx.wait();
  let mBalance = await hqToken.balanceOf(main.address);


  amount = amount.div(BigNumber.from('2'));
  tx = await hqToken.transfer(other.address, amount.toHexString());
  mBalance = await hqToken.balanceOf(main.address);
  let oBalance = await hqToken.balanceOf(other.address);


  let abi = await getArtifactPath("HqToken");


    //这里返回合约的名称和地址作为subgraph项目的初始化参数
  return { contractName: "HqToken", address: hqToken.address,abi:abi}
}

async function main(params) {

  try {
    let result = await deployToken();
    await hre.run('graph', result);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

}
main();

// 部署完合约后初始化subgraph项目
