//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract WavePortal {
    uint256 waveCounts;

    constructor() {
        console.log("Yo! This is the first smart contract!");
    }

    function wave() public {
        waveCounts += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("There are %d total waves!", waveCounts);
        return waveCounts;
    }
}
