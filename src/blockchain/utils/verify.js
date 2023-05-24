const { run } = require("hardhat");

module.exports.verify = async (contractAddress, args) => {
  console.log("Verifying contract...\n");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already verified!");
      } else {
        console.log(e);
      }
    }
  }
};
