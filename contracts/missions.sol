pragma solidity ^0.4.22;

contract Mission { 

    constructor () public payable {

    }

    function g () public payable returns (bool value) {  
        return true;
    }

    function a () public view returns (uint value) { 
        return 43;
    } 

    function b () public returns (uint value) { 
        return address(this).balance;
    }

    function submit () external returns (address value) {
     //   address(this).transer
        address(msg.sender).transfer(10);

        return msg.sender;
    }

}