const hre = require("hardhat");

async function main() {
  const ScoreManager = await hre.ethers.getContractFactory("ScoreManager");
  const scoreManager = await ScoreManager.deploy(); // deploy
  await scoreManager.deploymentTransaction()?.wait?.(); // ethers v6

  console.log("Contract deployed to:", scoreManager.target);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
