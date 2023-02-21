// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Fight
 * @notice Only super admin
 * @dev This contract is used as a proxy contract. Each user is created via UserFactory.
 * It can received token
 * @author Watson Bosquet
*/
contract Fight is ERC721, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;
  Counters.Counter private _fightIdCounter;

  mapping(uint256 => string) tokens;
  address private _superAdmin;
  string public collectionName;
  string public collectionSymbol;

  uint256 public constant MAX_SUPPLY = 1;

  struct Participant {
    address userAddress;
    bool fightWinner;
  }

  struct FightNight {
    uint256 fightId;
    uint256 fightTokenId;
    uint256 fightNumberOfRounds;
    uint256 nbTicketsSold;
    string fighterOneName;
    string fighterTwoName;
    address userWinningAddress;
    bool fighterWinner;
    bool isTokenMint;
  }

  FightNight[] fights;
  mapping(uint256 => mapping(address => Participant)) participantsPerFight;
  mapping(address => bool) admins;

  event FightCreated(uint256 indexed fightId, address indexed adminAddress, string fighterOne, string fighterTwo, string arena, string location, bool fightType, string fileLink, string fileCID);
  event AdminAdded(address indexed adminAddress);
  event UserHasJoinedAFight(uint256 indexed fightId, uint256 fightTicketId,  address indexed userAddress);
  event Withdrawal(uint256 amount, address to);

  modifier onlySuperAdmin(){
    require(_superAdmin == msg.sender, "You are not the super admin");
    _;
  }

  modifier onlyAdmin(){
    require(admins[msg.sender] == true, "You are not an admin");
    _;
  }

  modifier onlyUser(){
    require(_superAdmin != msg.sender, "You are a super admin, you cant participate");
    require(admins[msg.sender] == false, "You are an admin, you cant participate");
    _;
  }

  constructor(address _owner) ERC721("UFCJudgeReward", "UFCJR") {
    _superAdmin = _owner;
    transferOwnership(_superAdmin);
    collectionName = name();
    collectionSymbol = symbol();
  }

  /**
   * @notice Grant an address admin privilege
   * @param _adminAddress Address to grant
   * Emits a AdminAdded event
   */
  function addAdmin(address _adminAddress) external onlySuperAdmin {
    require(admins[_adminAddress] == false, "This address already has admin rights");
    require(_adminAddress != _superAdmin, "Super Admin cant be an admin");

    admins[_adminAddress] = true;
    emit AdminAdded(_adminAddress);
  }

  /**
   * @notice Create a Fight
   * @param _fighterOne Name of a fighter
   * @param _fighterTwo Name of a fighter
   * @param _arena Name of the arena of the fight
   * @param _location Name of the location of the fight
   * @param _fightType Type of fight, championship match or a regular fight night
   * @param _fileLink Link of the picture advertising the fight
   * @param _fileCID IPFS CID for the NFT metadata
   * Emits a FightCreated event
   */
  function createFight(
    string memory _fighterOne,
    string memory _fighterTwo,
    string memory _arena,
    string memory _location,
    bool _fightType,
    string memory _fileLink,
    string memory _fileCID
  ) external onlyAdmin {
    require(bytes(_fighterOne).length != 0, "fighterOne cant be empty");
    require(bytes(_fighterTwo).length != 0, "fighterTwo cant be empty");
    require(bytes(_arena).length != 0, "arena cant be empty");
    require(bytes(_location).length != 0, "location cant be empty");
    require(bytes(_fileLink).length != 0, "fileLink cant be empty");
    require(bytes(_fileCID).length != 0, "fileCID cant be empty");

    uint256 fightId = _fightIdCounter.current();
    _fightIdCounter.increment();

    FightNight memory fight;
    fight.fightId = fightId;
    fight.fighterOneName = _fighterOne;
    fight.fighterTwoName = _fighterTwo;
    fight.fightNumberOfRounds = _fightType ? 5 : 3;

    fights.push(fight);

    emit FightCreated(fightId, msg.sender, _fighterOne, _fighterTwo, _arena, _location, _fightType, _fileLink, _fileCID);
  }

  /**
   * @notice Mint an NFT that represents the event. The owner is the Fight contract
   * until there is a winner
   * @param _fightId Id of the fight
   * @param metadataCID IPFS CID for the NFT's metadata
   * Emits a transfer event
   */
  function safeMint(uint256 _fightId, address _to, string memory metadataCID) external onlyAdmin {
    require(_fightId < fights.length, 'Fight not found');
    require(fights[_fightId].isTokenMint == false , 'max supply reached for this fight');

    fights[_fightId].isTokenMint = true;

    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    tokens[tokenId] = metadataCID;
    fights[_fightId].fightTokenId = tokenId;

    _safeMint(_to, tokenId);
    _setTokenURI(tokenId, metadataCID);
  }

  /**
   * @notice Add user as a judge to a fight
   * @param _fightId Id of the Fight
   * @param _userAddress Address of the user added as a participant
   * Emits a UserHasJoinedAFight event
   */
  function userJoinAFightAsJudgeEnthusiast(uint256 _fightId, address _userAddress) external payable onlyUser {
    require(msg.value > 0.058 ether, "Not enough fonds");
    require(_fightId < fights.length, 'Fight not found');
    require(participantsPerFight[_fightId][_userAddress].userAddress == address(0), "You already joined the fight");

    Participant memory judge;
    judge.userAddress = _userAddress;
    participantsPerFight[_fightId][_userAddress] = judge;
    fights[_fightId].nbTicketsSold++;

    emit UserHasJoinedAFight(_fightId, fights[_fightId].nbTicketsSold, _userAddress);
  }

  /**
   * @notice Send all the money of the contract to the super admin wallet
   * Emits Withdrawal event
   */
  function withdraw() external onlySuperAdmin {
    uint amount = address(this).balance;
    require(amount > 0, "You dont have enough withdrawable balance");

    (bool transaction_succeed,) = _superAdmin.call{value: amount}('');
    require(transaction_succeed, 'operation denied');
    emit Withdrawal(amount, _superAdmin);
  }

  // The following functions are overrides required by Solidity.

  /**
   * @dev Test this method outside this smart contract
   */
  function _burn(uint256 _tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(_tokenId);
  }

  /**
   * @return the appropriate uri for the token
   */
  function tokenURI(uint256 _tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory){
    require(_tokenIdCounter.current() > _tokenId, 'This token does not exist');
    return super.tokenURI(_tokenId);
  }
}