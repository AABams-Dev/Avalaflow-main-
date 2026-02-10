
import { ethers } from "hardhat";

async function main() {
    const ENTRY_POINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"; // v0.6.0

    // 1. Deploy AvalaflowDynamicNFT
    console.log("Deploying AvalaflowDynamicNFT...");
    const AvalaflowNFT = await ethers.getContractFactory("AvalaflowDynamicNFT");
    const avalaflowNft = await AvalaflowNFT.deploy();
    await avalaflowNft.waitForDeployment();
    console.log(`AvalaflowDynamicNFT deployed to: ${await avalaflowNft.getAddress()}`);

    // 2. Deploy AvalaflowFactory
    console.log("Deploying AvalaflowFactory...");
    const AvalaflowFactory = await ethers.getContractFactory("AvalaflowFactory");
    const avalaflowFactory = await AvalaflowFactory.deploy(ENTRY_POINT_ADDRESS);
    await avalaflowFactory.waitForDeployment();
    console.log(`AvalaflowFactory deployed to: ${await avalaflowFactory.getAddress()}`);

    // 3. Grant Roles (Minter = Factory? Or Game Engine?)
    // For now, deployer is admin/minter. In prod, Factory might mint IF accounts are minting? 
    // No, usually a "Game" contract mints.
    // We'll keep deployer as minter for now.
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
