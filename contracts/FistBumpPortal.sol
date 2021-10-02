//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract FistBumpPortal {
    uint256 fistBumpCounts;

    // Help with random number generation
    uint256 private seed;

    //solidity event
    event NewFistBump(
        address indexed from,
        uint256 timestamp,
        string message,
        string link
    );

    //solidity struct - custom datatype
    struct FistBump {
        address fistBumpFrom; // address of user who fistbump'd
        string message; // message from user
        string link; //song link from user
        uint256 timestamp; // time of when user fistbump'd
    }

    //variable fistbumps that allows storing of array of structs
    FistBump[] fistbumps;

    // address => uint mapping - assocaiate an address with number - storing address with the last time user fistbump

    mapping(address => uint256) public lastFistBumpedAt;

    constructor() payable {
        console.log("Yo! This is the first smart contract!");
    }

    function fistBump(string memory _message, string memory _link) public {
        // 15 mins from last timestamp
        require(
            lastFistBumpedAt[msg.sender] + 15 minutes < block.timestamp,
            "Please wait 15 minutes!"
        );

        //update current timestamp we have for the user
        lastFistBumpedAt[msg.sender] = block.timestamp;

        fistBumpCounts += 1;
        console.log("%s has fistbump'd!", msg.sender);

        //stores data into array on line 19
        fistbumps.push(FistBump(msg.sender, _message, _link, block.timestamp));

        // generate pseudo random number between 0 to 100;
        uint256 randomNumber = (block.difficulty + block.timestamp + seed) %
            100;
        console.log("Random # generated: %s", randomNumber);

        seed = randomNumber;

        if (randomNumber < 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw moneny from contract.");
        }

        emit NewFistBump(msg.sender, block.timestamp, _message, _link);
    }

    function getAllFistBumps() public view returns (FistBump[] memory) {
        return fistbumps;
    }

    function getTotalFistBumps() public view returns (uint256) {
        return fistBumpCounts;
    }
}
