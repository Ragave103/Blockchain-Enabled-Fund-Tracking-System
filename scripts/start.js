async function main() {
  const fundsContractFactory = await hre.ethers.getContractFactory("Funds");
  const fundsContract = await fundsContractFactory.deploy();
  await fundsContract.deployed();

  const fundTxn1 = await fundsContract.create(
    "bafybeicxs3cbtwgeeklgoz7rjs25hj5ygf7dorgt5df4r1f54r465512fg5g",
    "5dfsf4554"
  );
  await fundTxn1.wait();

  const fundTxn2 = await fundsContract.create(
    "bafybeicxs3cbtwgeeklgoz7rjs25hj5ygf7dorgt5em5oiewnouwrjsh4u",
    "5698d4d2"
  );
  await fundTxn2.wait();

  funds = await fundsContract.getFunds();
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
