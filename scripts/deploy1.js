async function main() {
  const fundsContractFactory = await hre.ethers.getContractFactory("Funds");
  const fundsContract = await fundsContractFactory.deploy();
  await fundsContract.deployed();

  console.log("The funds contract is deployed!", fundsContract.address);

  let funds = await fundsContract.getFunds();
  console.log("We got the funds!", funds);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
