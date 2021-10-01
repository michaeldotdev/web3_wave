const main = async () => {
  const fistBumpContractFactory = await hre.ethers.getContractFactory('FistBumpPortal');
  const fistBumpContract = await fistBumpContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });

  await fistBumpContract.deployed();

  console.log('FistBumpPortal address: ', fistBumpContract.address);
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