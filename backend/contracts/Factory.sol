// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./User.sol";
import "./Event.sol";

///@title FactoryMMJ
///@notice This factory allows the creation of Events and Users contracts. Only registered admins can create an event and moderate it. 
///Only a regular user can create his profil and only the owner of the factory can add an admin
///@dev The owner of an event is the smart contract FactoryMMJ. An admin of an event can only manipulate created methods
///@author Watson Bosquet

contract Factory is Ownable {
  User[] usersContractsAddresses;
  Event[] eventsContractsAddresses;
  mapping(address => bool) admins;

  event AdminCreated(address indexed userAddress);
  event UserCreated(address indexed userContractAddress, address indexed userAddress);
  event EventCreated(address indexed eventAddress, address indexed adminAddress);

  modifier onlyAdmin(){
    require(admins[msg.sender] == true, "You are not an admin");
    _;
  }

  modifier notAnAdmin(){
    require(admins[msg.sender] == false, "You are an admin");
    _;
  }

  ///@notice Create a user and assign his address as the owner of the contract
  ///@param _userAddress Any address which are not been granted the admin priviledge
  function createUser(address _userAddress) notAnAdmin external {
    User user = new User(_userAddress);
    usersContractsAddresses.push(user);

    emit UserCreated(address(user), _userAddress);
  }

  ///@notice Create an event moderated by an known admin 
  ///@param _adminAddress Address of a user who has been given of the admin priviledge
  function createEvent(address _adminAddress) onlyAdmin external {
    require(admins[_adminAddress] == true, "Admin access is not granted for this user");
    Event myEvent = new Event(_adminAddress);
    eventsContractsAddresses.push(myEvent);

    emit EventCreated(address(myEvent), _adminAddress);
  }

  ///@notice Grant an address of the admin priviledge 
  ///@param _adminAddress Any address which has not already been granted the admin priviledge   
  function grantAdminAccess(address _adminAddress) onlyOwner external {    
    require(admins[_adminAddress] == false, "Admin access has already been granted for this user");
    admins[_adminAddress] = true;

    emit AdminCreated(_adminAddress);
  }
}