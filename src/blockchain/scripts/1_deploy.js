/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { ethers, network } = require("hardhat");
const hre = require("hardhat");
require("dotenv").config();

const verify = require("../utils/verify");

async function main() {
  console.log(`Preparing deployment...\n`);

  const Token = await hre.ethers.getContractFactory("Token");
  const Exchange = await hre.ethers.getContractFactory("Exchange");

  const accounts = await ethers.getSigners();

  console.log("Deploying smart contracts...\n");

  console.log(
    `Accounts fetched: ${accounts[0].address}, ${accounts[1].address}\n`
  );

  let name;

  const novus = await Token.deploy("Novus", "NOV", 1000000);
  await novus.deployed();
  name = await novus.name();
  console.log(`"${name}" contract deployed to: ${novus.address}\n`);

  const mETH = await Token.deploy("mETH", "mETH", 1000000);
  await mETH.deployed();
  name = await mETH.name();
  console.log(`"${name}" contract deployed to: ${mETH.address}\n`);

  const mDAI = await Token.deploy("mDAI", "mDAI", 1000000);
  await mDAI.deployed();
  name = await mDAI.name();
  console.log(`"${name}" contract deployed to: ${mDAI.address}\n`);

  const exchange = await Exchange.deploy(accounts[0].address, 1);
  await exchange.deployed();
  console.log(`"Exchange" contract deployed to: ${exchange.address}\n`);

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    let name;

    console.log("Waiting for block confirmations...\n");
    name = await novus.name();
    console.log(`Verifing ${name} contract...\n`);
    await novus.deployTransaction.wait(6);
    await verify(novus.address, ["Novus", "NOV", 1000000]);

    console.log("Waiting for block confirmations...\n");
    name = await mETH.name();
    console.log(`Verifing ${name} contract...\n`);
    await mETH.deployTransaction.wait(6);
    await verify(mETH.address, ["mETH", "mETH", 1000000]);

    console.log("Waiting for block confirmations...\n");
    name = await mDAI.name();
    console.log(`Verifing ${name} contract...\n`);
    await mDAI.deployTransaction.wait(6);
    await verify(mDAI.address, ["mDAI", "mDAI", 1000000]);

    console.log("Waiting for block confirmations...\n");
    name = await exchange.name();
    console.log(`Verifing ${name} contract...\n`);
    await exchange.deployTransaction.wait(6);
    await verify(exchange.address, [accounts[0].address, 0.01]);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
