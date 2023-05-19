/* eslint-disable no-undef */

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {},
  },
  paths: {
    artifacts: "./src/blockchain/artifacts",
    sources: "./src/blockchain/contracts",
    cache: "./src/blockchain/cache",
    tests: "./src/blockchain/test",
  },
};
