
import { ethers } from "hardhat";

async function main() {
    const ENTRY_POINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"; // v0.6.0

    // 1. Deploy AvaflowDynamicNFT
    console.log("Deploying AvaflowDynamicNFT...");
    const AvaflowNFT = await ethers.getContractFactory("AvaflowDynamicNFT");
    const avaflowNft = await AvaflowNFT.deploy();
    await avaflowNft.waitForDeployment();
    console.log(`AvaflowDynamicNFT deployed to: ${await avaflowNft.getAddress()}`);

    // 2. Deploy AvaflowFactory
    console.log("Deploying AvaflowFactory...");
    const AvaflowFactory = await ethers.getContractFactory("AvaflowFactory");
    const avaflowFactory = await AvaflowFactory.deploy(ENTRY_POINT_ADDRESS);
    await avaflowFactory.waitForDeployment();
    console.log(`AvaflowFactory deployed to: ${await avaflowFactory.getAddress()}`);

    // 3. Grant Roles (Minter = Factory? Or Game Engine?)
    // For now, deployer is admin/minter. In prod, Factory might mint IF accounts are minting? 
    // No, usually a "Game" contract mints.
    // We'll keep deployer as minter for now.
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
