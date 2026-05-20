const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying YB Global Token...");

  // Get signer
  const [deployer] = await ethers.getSigners();
  console.log(`📝 Deploying with account: ${deployer.address}`);

  // Deploy YBToken
  console.log("\n📦 Deploying YBToken...");
  const YBToken = await hre.ethers.getContractFactory("YBToken");
  const token = await YBToken.deploy(deployer.address);
  await token.deployed();
  console.log(`✅ YBToken deployed to: ${token.address}`);

  // Deploy YBStaking
  console.log("\n📦 Deploying YBStaking...");
  const YBStaking = await hre.ethers.getContractFactory("YBStaking");
  const staking = await YBStaking.deploy(token.address, token.address);
  await staking.deployed();
  console.log(`✅ YBStaking deployed to: ${staking.address}`);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    deployer: deployer.address,
    token: token.address,
    staking: staking.address,
    timestamp: new Date().toISOString(),
  };

  const fs = require("fs");
  fs.writeFileSync(
    `./deployments/${hre.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n✨ Deployment Summary:");
  console.log(`Network: ${hre.network.name}`);
  console.log(`YBToken: ${token.address}`);
  console.log(`YBStaking: ${staking.address}`);
  console.log(`\nDeployment info saved to deployments/${hre.network.name}.json`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
