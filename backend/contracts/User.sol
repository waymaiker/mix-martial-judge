// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

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
  uint256[] tokenIds;

  /**
   * @notice Create a user. Initialize all his information and emit a event
   * @param _firstname  User's firstname
   * @param _lastname User's lastname
   * @param _email User's email
   * @param _country User's country
   * @param _dob User's date of birth stored as a timestamp
   */
  function create(string memory _firstname, string memory _lastname, string memory _email, string memory _country, uint256 _dob)  external {
    require(participant.userAddress == address(0), "You already have an account");
    require(bytes(_firstname).length != 0, "firstname cant be empty");
    require(bytes(_lastname).length != 0, "lastname cant be empty");
    require(bytes(_email).length != 0, "email cant be empty");
    require(bytes(_country).length != 0, "country cant be empty");

    participant = Participant(msg.sender, _firstname, _lastname, _email, _country, _dob);
  }
  function getTokenIds(address _contactAddress) external {

  }

  /**
   * @notice This contract can receive ERC721 NFTs
   * @dev TODO could implement the fact that it can only receive NFT from Event contract
   */
  function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
    return IERC721Receiver.onERC721Received.selector;
  }
}