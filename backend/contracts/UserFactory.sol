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
  event UserCreated(address indexed userContractAddress, address indexed userAddress, string pseudo);

  constructor(address _userProxyContractAddress) {
    userProxyContractAddress = _userProxyContractAddress;
  }

  /**
   * @notice Create a user and emit a event
   * @param _pseudo  User's pseudo
   */
  function create(string memory _pseudo) external payable {
    require(registeredUsers[msg.sender] == false, "You already have an account");

    address user = createClone(userProxyContractAddress);
    User(user).create(_pseudo);

    registeredUsers[msg.sender] = true;
    registeredUsersContracts[user] = true;

    emit UserCreated(user, msg.sender,  _pseudo);
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