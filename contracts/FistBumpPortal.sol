//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract FistBumpPortal {
    uint256 fistBumpCounts;

    //solidity event
    event NewFistBump(address indexed from, uint256 timestamp, string message);

    //solidity struct - custom datatype
    struct FistBump {
        address fistBumpFrom; // address of user who fistbump'd
        string message; // message from user
        uint256 timestamp; // time of when user fistbump'd
    }

    //variable fistbumps that allows storing of array of structs
    FistBump[] fistbumps;

    constructor() {
        console.log("Yo! This is the first smart contract!");
    }

    function fistBump(string memory _message) public {
        fistBumpCounts += 1;
        console.log("%s has fistbump'd!", msg.sender);

        //stores data into array on line 19
        fistbumps.push(FistBump(msg.sender, _message, block.timestamp));

        emit NewFistBump(msg.sender, block.timestamp, _message);
    }

    function getAllFistBumps() public view returns (FistBump[] memory) {
        return fistbumps;
    }

    function getTotalFistBumps() public view returns (uint256) {
        return fistBumpCounts;
    }
}
