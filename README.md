# MMJ - Mix Martial Judge

## Contents
- [Concept](#concepts)
- [Important](#important)
- [Contracts Addresses](#contracts-addresses)
- [How to use this project](#how-to-use-this-project)
- [Resources](#resources)

## Concept
MMJ is a platform allowing an ufc fan, to enter in the skin of a referee.
During each fight, a spectator will be able to count the number of hits received by each fighter, the winner of each round and finally of the fight.

At the end, the spectator who has scored a number of hits similar (or the closest), of the tally of the referees, will earn an NFT. 
This token, will giving him/her access to privileges. For example, to meet the fighters, to participate in a training session, to have a full access to the preparation of the athletes during 1 week, to be in a dressing room at the beginning of a fight and why not, to be totally taken care of during a main event.  

Via a marketplace, each registered user will be able to buy or sell a generated nft.

Use cases - Super Admin  
✔️ Can give admin priviledge to an address.  
✔️ Has access to the list of admins.  
✔️ Has access to the list of past and upcoming events.  
✔️ Has access to the information on money generated accross all events by selling tickets.  
✔️ Has access to the information of number of tickets sold. 

Use cases - Admin  
✔️ Need to be registered by the super admin to have his priviledge enabled.  
✔️ Can create an event.   
✔️ Can designate a winner, **only when** at least one ticket has been sold and one user submitted his participation.  
✔️ Can create an NFT for a event for which they already designated the winner.  

Use cases - User  
✔️ A user need to be registered to participate to an event and access the marketplace.  
✔️ A user should pay a fee of 0.059 eth to buy a ticket to one fight.  
✔️ A fight could have 3 to 5 rounds.  
✔️ Each round will last 5 mins.  
✔️ You will be able to count each hit received by each fighter.  
✔️ After each round, you will submit your round's result.  
✔️ Data whose have been submitted can be modified.  


## Important

- [App demo - part 1 / UNDER UPDATE]()
- [App demo - part 2 / UNDER UPDATE]()
- [Vercel app - Not reflecting the last version of the app due to an issue with Vercel + Firebase](https://mix-martial-judge.vercel.app/)
- [Backend code base - Smart Contracts, Tests, Deployment ...](https://github.com/waymaiker/mix-martial-judge/tree/master/backend)

## Contracts Addresses
User - 0xF9702F05bF092447B435775e5da11937DE5bC8cb  
UserFactory - 0xa2Cf755aD51Cf6C55C5190EF3dc3438AfE3aA5E7  
Fight - 0x981D600E65c4c17B0E74D30823573903301F49bA  

## How to use this project
This project will require that you have already installed
* Yarn
* Node
* Git

If you are familiar with git and the terminal, here are few steps to follow

### Clone the project
```shell
git clone https://github.com/waymaiker/mix-martial-judge/
```

## Resources
Backend
* https://docs.soliditylang.org/en/latest/
* [https://hardhat.org/](https://github.com/NomicFoundation/hardhat)
* https://github.com/wighawag/hardhat-deploy
* https://github.com/ethers-io/ethers.js/
* https://www.chaijs.com/
* https://www.dotenv.org/docs/
* https://github.com/ItsNickBarry/hardhat-docgen
* https://github.com/cgewecke/hardhat-gas-reporter
* https://github.com/sc-forks/solidity-coverage

Frontend
* https://nextjs.org/
* https://chakra-ui.com/
* https://react-dropzone.js.org/
* https://www.framer.com/motion/
* https://www.rainbowkit.com/
* https://wagmi.sh/
* https://nft.storage/
* https://firebase.google.com/docs/build?hl=en
* https://vercel.com/home
