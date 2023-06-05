// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Importing the interface for the external contract
interface Contract{
    function attempt() external;
}

// Contract to interact with the external contract
contract Winner {
    address public contractAddress;

    constructor(address _contractAddress){
        contractAddress = _contractAddress;
    }

    // Function to call the attempt function in the external contract
    function setWinner() external {
        Contract(contractAddress).attempt();
    }
}
