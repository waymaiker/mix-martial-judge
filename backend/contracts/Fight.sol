// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Fight is ERC721, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;
  Counters.Counter private _fightIdCounter;
  mapping(uint256 => string) tokens;
  address private _superAdmin;

  struct Touch {
    uint256[] head;
    uint256[] body;
    uint256[] legs;
  }

  struct Round {
    string title;
    Touch fighter_L;
    Touch fighter_R;
    uint256 winner;
  }

  struct Participant {
    address userAddress;
    Round[] rounds;
  }

  struct FightNight {
    uint256 fightId;
    string fighterOneName;
    string fighterTwoName;
    address userWinningAddress;
  }

  mapping(address => bool) admins;
  mapping(address => FightNight[]) fights;
  mapping(uint256 => Round[]) judgesCountPerFight;
  mapping(uint256 => Participant[]) participantsPerFight;
  mapping(address => uint256) numberOfFightByAdmin;

  event FightCreated(uint indexed fightId, address indexed adminAddress, string fighterOne, string fighterTwo, string arena, string location, bool fightType, string fileLink, string fileCID);
  event AdminAdded(address indexed _adminAddress);

  modifier onlySuperAdmin(){
    require(_superAdmin == msg.sender, "You are not the super admin");
    _;
  }

  modifier onlyAdmin(){
    require(admins[msg.sender] == true, "You are not an admin");
    _;
  }

  constructor(address _owner) ERC721("UFCJudgeReward", "UFCJR") {
    _superAdmin = _owner;
  }

  /**
   * @notice Grant an address admin privilege
   * @param _adminAddress Address to grant
   * Emits a AdminAdded event
   */
  function addAdmin(address _adminAddress) external onlySuperAdmin {
    require(admins[_adminAddress] == false, "This address already has admin rights");

    admins[_adminAddress] = true;
    emit AdminAdded(_adminAddress);
  }

  /**
   * @notice Create an event and Mint a token representing it
   * @param _fighterOne Name of a fighter
   * @param _fighterTwo Name of a fighter
   * @param _arena Name of the arena of the fight
   * @param _location Name of the location of the fight
   * @param _fightType Type of fight, championship match or a regular fight night
   * @param _fileLink Link of the picture advertising the fight
   * @param _fileCID IPFS CID for the NFT metadata
   * Emits a FightCreated event
   */
  function create(
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

    fights[msg.sender].push(fight);
    numberOfFightByAdmin[msg.sender]++;

    emit FightCreated(fightId, msg.sender, _fighterOne, _fighterTwo, _arena, _location, _fightType, _fileLink, _fileCID);
  }

  /**
   * @notice Mint an NFT that represents the event
   * @param _to Address that will be assign as the NFT owner
   * @param _CID IPFS CID for the NFT's metadata
   * Emits a transfer event
   */
  function safeMint(address _to, string memory _CID) external onlyAdmin {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    tokens[tokenId] = _CID;
    _safeMint(_to, tokenId);
    _setTokenURI(tokenId, _CID);
  }

  // The following functions are overrides required by Solidity.

  function _burn(uint256 _tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(_tokenId);
  }

  function tokenURI(uint256 _tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory){
    return super.tokenURI(_tokenId);
  }
}


  // event ParticipantHasJoined(address indexed eventAddress, address indexed userAddress);
  // event ParticipantUpdated(address indexed eventAddress, address indexed userAddress);
  // event JudgeAdded(address eventAddress);
  // event JudgesVotesTailled(address eventAddress, uint256 head, uint256 body, uint256 legs);

    // function userJoinFight() external payable {
  //   require(msg.value > 0.08 ether, "Not enough funds deposited");
  //   emit ParticipantHasJoined(address(this), msg.sender);
  // }

  // function updateParticipantRound() external {

  // }


