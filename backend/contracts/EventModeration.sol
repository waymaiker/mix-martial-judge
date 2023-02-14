// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Event is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  uint256 tokenId;
  address winningUserAddress;
  address winningFighterAddress;
  bool fightType;

  enum ChampionshipWorkflowStatus { ONE, TWO, THREE, FOUR, FIVE, FINISHED }
  enum RegularWorkflowStatus { ONE, TWO, THREE, FINISHED }

  struct Touch { uint256[] head; 
    uint256[] body; 
    uint256[] legs; 
  }

  struct Round { string title;
   Touch fighther_L;
   Touch fighther_R;
   uint256 winner;
  }

  struct Participant {
    address userAddress;
    Round[] rounds;
  }

  ChampionshipWorkflowStatus championshipWorkflowStatus;
  RegularWorkflowStatus regularWorkflowStatus;
  mapping(address => Participant) participants;
  Round[] rounds;
  Touch judgesResults;

  event EventCreated(address indexed eventAddress, bytes32 name, bytes32 description, bytes32  place, uint256 hour, uint256 minute, uint256 tokenIds);
  event FightSetup(address indexed eventAddress, bool fightType);
  event ParticipantAdded(address indexed eventAddress, address indexed userAddress);
  event ParticipantUpdated(address indexed eventAddress, address indexed userAddress);
  event JudgeAdded(address eventAddress);
  event ChampionshipWorkflowStatusChange(ChampionshipWorkflowStatus previousStatus, ChampionshipWorkflowStatus nextStatus);
  event RegularWorkflowStatusChange(RegularWorkflowStatus previousStatus, RegularWorkflowStatus nextStatus);
  event JudgesVotesTailled(address eventAddress, uint256 head, uint256 body, uint256 legs);

  modifier onlyAdmin(){
    require(admin == msg.sender, "You are not an admin");
    _;
  }

  constructor(address _adminAddress) ERC721("MMJEvent", "MMJEvent") {
    admin = _adminAddress;
  }

  function createEvent(
    bytes32 _name, 
    bytes32 _description, 
    bytes32 _place, 
    uint256 _date, 
    uint256 _hour, 
    uint256 _minute
  ) onlyOwner external {

    emit EventCreated(address(0), _name, _description, _place, _date, _hour, _minute);
  }

  function setupFight(bool _fightType) onlyOwner external {
     
    emit FightSetup(address(this), fightType);
  }

  function addJudgesResults(uint256 head, uint256 body, uint256 legs) onlyOwner external {

  }

  function goToNextPhase() onlyOwner external {            
    if(fightType){
      require (uint(championshipWorkflowStatus) <= uint(ChampionshipWorkflowStatus.FIVE), "Fight finished");

      ChampionshipWorkflowStatus previousStatus = championshipWorkflowStatus;
      championshipWorkflowStatus = ChampionshipWorkflowStatus(uint (championshipWorkflowStatus) + 1);
        
      emit ChampionshipWorkflowStatusChange(previousStatus, championshipWorkflowStatus);
    } else {
      require (uint(regularWorkflowStatus) <= uint(RegularWorkflowStatus.THREE), "Fight finished");

      RegularWorkflowStatus previousStatus = regularWorkflowStatus;
      regularWorkflowStatus = RegularWorkflowStatus(uint (regularWorkflowStatus) + 1);
        
      emit RegularWorkflowStatusChange(previousStatus, regularWorkflowStatus);
    }
  }

  function addParticipant() external {

  }

  function updateParticipantRound() external {

  }

  function tallyVotes() onlyAdmin external {
    if(fightType){
      emit ChampionshipWorkflowStatusChange(ChampionshipWorkflowStatus.FIVE, ChampionshipWorkflowStatus.FINISHED);
    } else {
      emit RegularWorkflowStatusChange(RegularWorkflowStatus.THREE, RegularWorkflowStatus.FINISHED);
    }  
  }

  function tallyJudgesVotes(uint256 _head, uint256 _body, uint256 _legs) onlyAdmin external {

    emit JudgesVotesTailled(address(this), _head, _body, _legs);
  }

  function getTokenId() onlyOwner external returns(uint256){

  }
   
  function getWinnerUserAddress() external returns(address){

  }

  function transferToken(address from, address to) onlyOwner external {

  }

  function mint(address _userAddress) onlyOwner external {
    // require(admin.identifiableUsers[_userAddress] == true, "You are not identifiable by this administration");
    // require(admin.sharedTokenIds[_userAddress] == 0, "This user already has been identified");

    tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();

    // admin.sharedTokenIds[_userAddress] = tokenId;
    _safeMint(_userAddress, tokenId);
  }
}