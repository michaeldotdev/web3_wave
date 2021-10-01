const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const fistBumpContractFactory = await hre.ethers.getContractFactory('FistBumpPortal');
  const fistBumpContract = await fistBumpContractFactory.deploy();
  await fistBumpContract.deployed();

  console.log("Contract deployed to:", fistBumpContract.address);
  console.log("Contract deployed by:", owner.address);

  let fistBumpsTotal;
  fistBumpsTotal = await fistBumpContract.getTotalfistBumps();

  //fistBumpTransaction
  let fistBumpTxn = await fistBumpContract.fistBump();
  await fistBumpTxn.wait();

  fistBumpsTotal = await fistBumpContract.getTotalfistBumps();

  fistBumpTxn = await fistBumpContract.connect(randomPerson).fistBump();
  await fistBumpTxn.wait();

  fistBumpsTotal = await fistBumpContract.getTotalfistBumps();
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();