// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

// Minimal UserOperation struct
struct UserOperation {
    address sender;
    uint256 nonce;
    bytes initCode;
    bytes callData;
    uint256 callGasLimit;
    uint256 verificationGasLimit;
    uint256 preVerificationGas;
    uint256 maxFeePerGas;
    uint256 maxPriorityFeePerGas;
    bytes paymasterAndData;
    bytes signature;
}

contract AvalaflowAccount is Initializable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    address public entryPoint;
    address public owner;

    event AvalaflowAccountInitialized(address indexed entryPoint, address indexed owner);

    modifier onlyEntryPoint() {
        require(msg.sender == entryPoint, "Not EntryPoint");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    // Constructor ensures the implementation contract itself is initialized (locked)
    constructor() {
        _disableInitializers();
    }

    function initialize(address _entryPoint, address _owner) public initializer {
        entryPoint = _entryPoint;
        owner = _owner;
        emit AvalaflowAccountInitialized(_entryPoint, _owner);
    }

    receive() external payable {}

    // 4337 Interface
    function validateUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData) {
        require(msg.sender == entryPoint, "Not EntryPoint");
        
        // Verify signature (Owner must sign the hash)
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        address signer = hash.recover(userOp.signature);
        
        if (signer != owner) {
            return 1; // SIG_VALIDATION_FAILED
        }

        // Pay prefund
        if (missingAccountFunds > 0) {
            (bool success,) = entryPoint.call{value: missingAccountFunds}("");
            (success);
        }

        return 0; // SIG_VALIDATION_SUCCESS
    }

    // Execution
    function execute(address dest, uint256 value, bytes calldata func) external {
        _requireFromEntryPointOrOwner();
        (bool success, bytes memory result) = dest.call{value: value}(func);
        require(success, string(result));
    }

    function _requireFromEntryPointOrOwner() internal view {
        require(msg.sender == entryPoint || msg.sender == owner, "Unauthorized");
    }
}
