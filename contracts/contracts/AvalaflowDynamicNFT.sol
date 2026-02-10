// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AvalaflowDynamicNFT is ERC721URIStorage, AccessControl {
    using Strings for uint256;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant GAME_ROLE = keccak256("GAME_ROLE");

    uint256 private _nextTokenId;

    struct FigureStats {
        uint256 level;
        uint256 experience;
        uint256 battlesWon;
        uint256 scannedCount;
    }

    mapping(uint256 => FigureStats) public stats;
    mapping(string => bool) public nfcTagUsed; 
    mapping(uint256 => string) public tokenToNfcId;

    event FigureLeveledUp(uint256 indexed tokenId, uint256 newLevel);
    event ExperienceGained(uint256 indexed tokenId, uint256 amount);

    constructor() ERC721("AvalaflowCollectibles", "AFLO") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(GAME_ROLE, msg.sender);
    }

    function mint(address to, string memory nfcId) public onlyRole(MINTER_ROLE) {
        require(!nfcTagUsed[nfcId], "Tag already used");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        
        // Initial stats
        stats[tokenId] = FigureStats(1, 0, 0, 0);
        nfcTagUsed[nfcId] = true;
        tokenToNfcId[tokenId] = nfcId;
    }

    // Game Logic - Only authorized contracts can call this
    function addExperience(uint256 tokenId, uint256 amount) public onlyRole(GAME_ROLE) {
        _requireOwned(tokenId);
        
        stats[tokenId].experience += amount;
        emit ExperienceGained(tokenId, amount);

        // Simple Level Up Logic
        if (stats[tokenId].experience >= stats[tokenId].level * 100) {
            stats[tokenId].level++;
            stats[tokenId].experience = 0;
            emit FigureLeveledUp(tokenId, stats[tokenId].level);
        }
    }

    function recordScan(uint256 tokenId) public onlyRole(GAME_ROLE) {
        stats[tokenId].scannedCount++;
        addExperience(tokenId, 10); // Scanning gives XP
    }

    // Metadata
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);

        FigureStats memory s = stats[tokenId];
        
        string memory name = string(abi.encodePacked("Avalaflow Unit #", tokenId.toString()));
        string memory description = "A dynamic Avalaflow collectible that evolves with physical interaction.";
        // Dynamic image based on level could go here
        string memory image = "https://figo-r1.vercel.app/images/molly_base.png"; 

        string memory attributes = string(abi.encodePacked(
            '[',
            '{"trait_type": "Level", "value": ', s.level.toString(), '},',
            '{"trait_type": "Experience", "value": ', s.experience.toString(), '},',
            '{"trait_type": "Scans", "value": ', s.scannedCount.toString(), '}',
            ']'
        ));

        string memory json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "', name, '",',
            '"description": "', description, '",',
            '"image": "', image, '",',
            '"attributes": ', attributes,
            '}'
        ))));

        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
