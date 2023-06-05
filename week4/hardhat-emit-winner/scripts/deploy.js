const hre = require("hardhat");

const CONTRACT_ADDR = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";

async function main() {
  const Winner = await hre.ethers.getContractFactory("Winner");
  const winner = await Winner.deploy(CONTRACT_ADDR);

  await winner.setWinner();

  console.log(
    `Contract deployed from ${winner.address} & emitting an event over to ${CONTRACT_ADDR}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
