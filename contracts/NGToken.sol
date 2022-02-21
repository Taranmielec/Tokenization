// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NGToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("New Generation Token", "NGT") {
        _mint(msg.sender, initialSupply);
        
    }
}