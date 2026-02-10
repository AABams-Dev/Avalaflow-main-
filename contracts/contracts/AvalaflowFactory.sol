// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./AvalaflowAccount.sol";

contract AvalaflowFactory {
    address public immutable accountImplementation;
    address public immutable entryPoint;

    event AccountCreated(address indexed account, address indexed owner);

    constructor(address _entryPoint) {
        entryPoint = _entryPoint;
        accountImplementation = address(new AvalaflowAccount());
    }

    function createAccount(address owner, uint256 salt) external returns (address ret) {
        address addr = getAccountAddress(owner, salt);
        uint256 codeSize = addr.code.length;
        if (codeSize > 0) {
            return addr;
        }

        bytes32 finalSalt = keccak256(abi.encode(owner, salt));
        ret = Clones.cloneDeterministic(accountImplementation, finalSalt);
        AvalaflowAccount(payable(ret)).initialize(entryPoint, owner);
        
        emit AccountCreated(ret, owner);
    }

    function getAccountAddress(address owner, uint256 salt) public view returns (address) {
        bytes32 finalSalt = keccak256(abi.encode(owner, salt));
        return Clones.predictDeterministicAddress(accountImplementation, finalSalt);
    }
}
