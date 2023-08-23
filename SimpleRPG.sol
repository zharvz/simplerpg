// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleRPG {
    address public owner;
    uint256 public greenChangePrice = 0.01 ether; // Price per change (0.01 FTM)

    mapping(address => bool) public hasGreenHead;
    mapping(address => bool) public hasGreenTorso;
    mapping(address => bool) public hasGreenLegs;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function buyGreenHead() external payable {
        require(msg.value >= greenChangePrice, "Insufficient payment");
        require(!hasGreenHead[msg.sender], "You already have a green head");
        hasGreenHead[msg.sender] = true;
    }

    function buyGreenTorso() external payable {
        require(msg.value >= greenChangePrice, "Insufficient payment");
        require(!hasGreenTorso[msg.sender], "You already have a green torso");
        hasGreenTorso[msg.sender] = true;
    }

    function buyGreenLegs() external payable {
        require(msg.value >= greenChangePrice, "Insufficient payment");
        require(!hasGreenLegs[msg.sender], "You already have green legs");
        hasGreenLegs[msg.sender] = true;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
    }
}
