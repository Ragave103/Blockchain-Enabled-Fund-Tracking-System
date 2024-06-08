// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  const contracfactory = await hre.ethers.getContractFactory(
    "multitransaction"
  );
  const contract = await contracfactory.deploy();
  await contract.deployed();

  console.log("contract deployed to : ", contract.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/*Deploying contracts with the account: 0x2C59a9B777b2273cF1E436D46678C6e8b43b13B1
Account balance: 177910068924790512
contract deployed to :  0xDCff6Df0F4696A273FA7c292FF745e6327fB3ABF*/
