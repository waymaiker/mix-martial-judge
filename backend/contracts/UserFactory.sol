// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./CloneFactory.sol";
import "./User.sol";

/**
 * @title UserFactory
 * @notice This factory allows Users contracts.
 * Only a regular user can create his profil and only the owner of the factory can add an admin
 * @dev The owner of an event is the smart contract UserFactory. An admin of an event can only manipulate created methods
 * @author Watson Bosquet
*/

contract UserFactory is CloneFactory, Ownable {
  address public userProxyContractAddress;
  mapping(address => bool) private registeredUsersContracts;
  mapping(address => bool) private registeredUsers;

  event UserProxyContractAddressUpdated(address indexed previousUserProxyContractAddress, address indexed newUserProxyContractAddress);
  event UserCreated(address indexed userContractAddress, address indexed userAddress, string firstname, string lastname, string email, string country, uint256 dob);

  constructor(address _userProxyContractAddress) {
    userProxyContractAddress = _userProxyContractAddress;
  }

  /**
   * @notice Create a user. Initialize all his information and emit a event
   * @param _firstname  User's firstname
   * @param _lastname User's lastname
   * @param _email User's email
   * @param _country User's country
   * @param _dob User's date of birth stored as a timestamp
   */
  function create(
    string memory _firstname,
    string memory _lastname,
    string memory _email,
    string memory _country,
    uint256 _dob
  ) external payable {
    require(registeredUsers[msg.sender] == false, "You already have an account");

    address user = createClone(userProxyContractAddress);
    User(user).create(_firstname, _lastname, _email, _country, _dob);

    registeredUsers[msg.sender] = true;
    registeredUsersContracts[user] = true;

    emit UserCreated(user, msg.sender,  _firstname, _lastname, _email, _country, _dob);
  }

  /**
   * @notice Update the user proxy contract address
   * @param _userProxyContractAddress Address of the User contract used as proxy
   * @dev _userProxyContractAddress provided as an argument, has to be a contract address
   */
  function updateUserProxyContractAddress(address _userProxyContractAddress) external onlyOwner {
    require(userProxyContractAddress != _userProxyContractAddress, "This address is already used as the proxy");
    require(Address.isContract(_userProxyContractAddress) == true, "Provided address is not valid");

    address oldUserProxyContractAddress =  userProxyContractAddress;
    userProxyContractAddress = _userProxyContractAddress;

    emit UserProxyContractAddressUpdated(oldUserProxyContractAddress, userProxyContractAddress);
  }
}