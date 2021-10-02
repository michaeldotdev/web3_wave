const main = async () => {
  const fistBumpContractFactory = await hre.ethers.getContractFactory('FistBumpPortal');
  const fistBumpContract = await fistBumpContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1")
  });
  await fistBumpContract.deployed();
  console.log("Contract deployed to:", fistBumpContract.address);

  // Get contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    fistBumpContract.address
  );
  console.log(
    'Contract Balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  //fistBumpTransaction - to fistbump!
  let fistBumpTxn = await fistBumpContract.fistBump("This is fistbump 1", "a link!");
  await fistBumpTxn.wait(); // waiting to be mined

  let fistBumpTxn2 = await fistBumpContract.fistBump("This is fistbump 2", "a link!");
  await fistBumpTxn2.wait(); // waiting to be mined

  contractBalance = await hre.ethers.provider.getBalance(fistBumpContract.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  // let allFistBumps = await fistBumpContract.getAllFistBumps();
  // console.log(allFistBumps);
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