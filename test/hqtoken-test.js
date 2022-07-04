const { expect, assert } = require("chai");
const { BigNumber, errors } = require("ethers");
const { ethers } = require("hardhat");


describe("HqToken", function () {

  it("Should return the new greeting once it's changed", async function () {

    const [main,other] = await ethers.getSigners();
  
    const HqToken = await ethers.getContractFactory("HqToken");
    const hqToken = await HqToken.deploy("HqToken",'HQT',18);
    await hqToken.deployed();
    console.log("HqToken:",hqToken.address);
    
    let uint = BigNumber.from("1000000000000000000");

    let num = BigNumber.from("2022")
    let amount = num.mul(uint);
    let tx = await hqToken.mint(main.address,amount.toHexString());
    tx = await tx.wait();
    let mBalance = await hqToken.balanceOf(main.address);
    expect(mBalance.eq(amount),"铸造失败");


    amount = amount.div(BigNumber.from('2'));
    tx = await hqToken.transfer(other.address, amount.toHexString());
    mBalance = await hqToken.balanceOf(main.address);
    let oBalance = await hqToken.balanceOf(other.address);
    expect(mBalance.eq(oBalance),"转账失败");
 
  });
});
