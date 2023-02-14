// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract User is IERC721Receiver, Ownable {

  struct Person {
    bytes32 firstname;
    bytes32 lastname;
    bytes32 email;
    uint256 dob;
    uint256 password;
  }

  address owner;
  Person user;
  address[] eventParticipated;
  uint256[] tokenIds;
  
  event UserUpdated(address indexed _address, bytes32 indexed _pseudo, bytes32 _firstname, bytes32 _lastname, bytes32 _email, uint256 _dob);

  ///@notice Verify user submitted data.
  ///@param _firstname Firstname of the user
  ///@param _lastname Lastname of the user
  ///@param _email Email of the user
  ///@param _dob Date of Birth of the user, stored as a timestamp   
  modifier onlyValidData(
    address indexed _userAddress, 
    bytes32 indexed _pseudo, 
    bytes32 _firstname, 
    bytes32 _lastname, 
    bytes32 _email, 
    uint256 _dob
  ){
    require(bytes(_firstname).length != 0, "firstname cant be empty");
    require(bytes(_lastname).length != 0, "lastname cant be empty");
    require(bytes(_birthplace).length != 0, "birthplace cant be empty");
    require(bytes(_birthplace).length != 0, "birthplace cant be empty");
    require(keccak256(bytes(_sexe)) == keccak256(bytes("M")) || keccak256(bytes(_sexe)) == keccak256(bytes("F")),"Sexe is only equals to M or F");
    _;
  }

  /*************************************/
  /************ Constructor ************/
  /*************************************/

  constructor(address _owner){
    owner = _owner;
  }

  ///@notice Update a user.
  ///@param _firstname Firstname of the user
  ///@param _middlename Middlename of the user
  ///@param _lastname Lastname of the user
  ///@param _birthday Birthday of the user, stored as a timestamp
  ///@param _birthplace Birth place of the user
  ///@param _sexe Sexe of the user
  function create(
    bytes32 calldata _firstname,
    bytes32 calldata _middlename,
    bytes32 calldata _lastname,
    uint256 _birthday,
    bytes32 calldata _birthplace,
    bytes32 calldata _sexe
  ) onlyValidData(_firstname, _middlename, _lastname, _birthday, _birthplace, _sexe) external {
    require(owner == address(0), "This user already exist");
    user = Person(_birthday, _firstname,_middlename,_lastname,_birthplace,_sexe);

    emit UserUpdated(msg.sender, _firstname, _middlename, _lastname, _birthday, _birthplace, _sexe, false, false);
  }

  function getTokenIds(address _contactAddress) onlyOwner external {

  }

  function onIERC721Received(address operator, address from, uint256 tokenId, bytes32 data) external returns(bytes) {

  }
}