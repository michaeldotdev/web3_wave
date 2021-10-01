//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract FistBumpPortal {
    uint256 fistBumpCounts;

    constructor() {
        console.log("Yo! This is the first smart contract!");
    }

    function fistBump() public {
        fistBumpCounts += 1;
        console.log("%s has fistbump'd!", msg.sender);
    }

    function getTotalfistBumps() public view returns (uint256) {
        console.log("There are %d total fistbumps!", fistBumpCounts);
        return fistBumpCounts;
    }
}
