pragma solidity ^0.4.22;

import * as mission from "./Mission.sol";

contract MissionFactory {
  //  address[] newContracts;

    function createContract() public returns (address) {
        address newContract = new mission.Mission();

        return newContract;
    } 
}