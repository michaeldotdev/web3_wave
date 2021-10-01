const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const fistBumpContractFactory = await hre.ethers.getContractFactory('FistBumpPortal');
  const fistBumpContract = await fistBumpContractFactory.deploy();
  await fistBumpContract.deployed();

  console.log("Contract deployed to:", fistBumpContract.address);
  console.log("Contract deployed by:", owner.address);

  let fistBumpsTotal;
  fistBumpsTotal = await fistBumpContract.getTotalFistBumps();
  console.log(fistBumpsTotal.toNumber());

  //fistBumpTransaction
  let fistBumpTxn = await fistBumpContract.fistBump("A message!");
  await fistBumpTxn.wait(); // waiting to be mined

  const [_, randoPerson] = await ethers.getSigners();
  fistBumpTxn = await fistBumpContract.connect(randoPerson).fistBump("Another message!");
  await fistBumpTxn.wait();

  let allFistBumps = await fistBumpContract.getAllFistBumps();
  console.log(allFistBumps);
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