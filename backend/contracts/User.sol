// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";


/**
 * @title User
 * @notice Allow to receive ERC721 token and store all data related to a user
 * @dev This contract is used as a proxy contract. Each user is created via UserFactory.
 * @author Watson Bosquet
*/
contract User is IERC721Receiver {
  struct Participant {
    address userAddress;
    string firstname;
    string lastname;
    string email;
    string country;
    uint256 dob;
  }

  Participant participant;
  mapping(uint256 => uint256) tokenIds;

  event UserCreated(address indexed _userAddress, string _firstname, string _lastname, string _email, string country, uint256 _dob);
  event ERC721ContractAddressEmitterUpdated(address indexed previousERC721ContractAddressEmitter, address indexed newERC721ContractAddressEmitter);

  /**
   * @notice Create a user. Initialize all his information and emit a event
   * @param _firstname  User's firstname
   * @param _lastname User's lastname
   * @param _email User's email
   * @param _country User's country
   * @param _dob User's date of birth stored as a timestamp
   */
  function create(string memory _firstname, string memory _lastname, string memory _email, string memory _country, uint256 _dob) external {
    require(participant.userAddress == address(0), "You already have an account");
    require(bytes(_firstname).length != 0, "firstname cant be empty");
    require(bytes(_lastname).length != 0, "lastname cant be empty");
    require(bytes(_email).length != 0, "email cant be empty");
    require(bytes(_country).length != 0, "country cant be empty");

    participant = Participant(msg.sender, _firstname, _lastname, _email, _country, _dob);
  }

  /**
   * @notice This contract can receive the reward NFTs
   * @dev TODO could implement the fact that it can only receive NFT from Event contract
   * put a address private ERC721ContractAddressEmitter;
   * add to this function require(ERC721ContractAddressEmitter == from, "The sender is not verified");
   * by extension create 2 methods to update the variable through UserFactory contract:
   * - function updateERC721ContractAddressEmitter(address _newERC721ContractAddressEmitter) external onlyOwner
   * allow to update the value of ERC721ContractAddressEmitter
   * -  function getERC721ContractAddressEmitter() external view onlyOwner returns(address) to get the value from UserFactory, to be able to
   * check the value when needed
   *
   * Plus here we should store the tokenId into a array of tokenIds
   */
  function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
    return IERC721Receiver.onERC721Received.selector;
  }
}