pragma solidity ^0.4.20;

contract Mission { 

    address owner;
    address factory;

    // constructor(address _owner) public {
    //     owner = _owner;
    //     factory = msg.sender;
    // }

    // modifier ownerRestricted {
    //   require(owner == msg.sender);
    //   _;
    // }

    // function destroyContract () ownerRestricted {
    //  suicide(owner);
    // }

    function endowment () public payable returns (uint) {  
        return msg.value;
    }

    function remainingBalance () public returns (uint value) { 
        return address(this).balance;
    }

    function submit () public {
        address(msg.sender).transfer(1598907167708886670);
    }

    function () public payable { }

}