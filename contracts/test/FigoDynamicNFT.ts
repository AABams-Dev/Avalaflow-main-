import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("FigoDynamicNFT", function () {
    async function deployFixture() {
        const [owner, otherAccount] = await hre.ethers.getSigners();
        const Figo = await hre.ethers.getContractFactory("FigoDynamicNFT");
        const figo = await Figo.deploy();
        return { figo, owner, otherAccount };
    }

    it("Should mint and have initial stats", async function () {
        const { figo, owner } = await loadFixture(deployFixture);
        await figo.mint(owner.address, "tag-123");

        expect(await figo.ownerOf(0)).to.equal(owner.address);
        const uri = await figo.tokenURI(0);
        expect(uri).to.include("data:application/json;base64");
    });

    it("Should update stats on interaction", async function () {
        const { figo, owner } = await loadFixture(deployFixture);
        await figo.mint(owner.address, "tag-123");

        await figo.addExperience(0, 150);

        const stats = await figo.stats(0);
        expect(stats.level).to.equal(2);
        expect(stats.experience).to.equal(0);
    });
});
