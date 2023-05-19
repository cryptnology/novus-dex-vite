/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  console.log(`Preparing deployment...\n`);

  const Token = await hre.ethers.getContractFactory("Token");
  const Exchange = await hre.ethers.getContractFactory("Exchange");

  const accounts = await ethers.getSigners();

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

  const exchange = await Exchange.deploy(accounts[0].address, 10);
  await exchange.deployed();
  console.log(`"Exchange" contract deployed to: ${exchange.address}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
