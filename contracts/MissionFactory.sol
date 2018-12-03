pragma solidity ^0.4.22;

import * as mission from "./Mission.sol";

contract MissionFactory {

    struct DataObject {
        address contractAddress;
        string name;
    }
    mapping (address => dataObject[]) public missions;

    function createContract (string name) public returns (address) {
        address newMissions = address(new mission.Mission());
        DataObject do = { contractAddress: newMissions}
     
        missions[msg.sender] = do;
    }

    // function getMissions () public return (name) {
    //     return 
    // }




}