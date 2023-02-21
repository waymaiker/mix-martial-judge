const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Units tests METHODS of Fight smart contract", function(){
    let accounts;
    let fight;
    let _superAdmin;
    let _admin;
    let _guestUser

    const fileLink = "https://bafkreia4fzl7vofaudod6qrcwi52p4tkvgnj6lsruhm7hv2n6zmof7v4wy.ipfs.dweb.link/"
    const metadataCID = "ipfs://bafkreia4fzl7vofaudod6qrcwi52p4tkvgnj6lsruhm7hv2n6zmof7v4wy"
    const tokenReceiver = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    const fightId = 0

    before(async () => {
      accounts = await ethers.getSigners()
      _superAdmin = accounts[0]
      _admin = accounts[1]
      _guestUser = accounts[2]
    })

    describe("Deployment", function() {
      it("should deploy the smart contract", async function() {
        await deployments.fixture(["fight"])
        fight = await ethers.getContract("Fight")
      })
    })

    describe("Tests: Contract OWNERSHIP", function() {
      it('Super Admin should be the owner', async () => {
        let owner = await fight.owner()
        expect(owner).to.be.equals(await _superAdmin.getAddress())
      })
    })

    describe("Tests: TOKEN IDENTIFICATION", function() {
      it('should have a NAME', async () => {
        const name = await fight.collectionName()
        assert.equal(name, "UFCJudgeReward")
      })
      it('should have a SYMBOL', async () => {
        const symbol = await fight.collectionSymbol()
        assert.equal(symbol, "UFCJR")
      })
    })

    describe("Tests: METHODS", function() {

      /*************************************
       * METHODS AddAdmin  ONLY SUPER ADMIN *
       **************************************/

      describe("AddAdmin - Add an fight admin", function(){
        beforeEach(async() => {
          await deployments.fixture(["fight"])
          fight = await ethers.getContract("Fight")
        })

        it("should ADD an ADMIN - as a Super Admin", async function(){
          await expect(fight.connect(_superAdmin).addAdmin(_admin.getAddress())).not.to.be.reverted
        })
        it("should ADD an ADMIN and EMITS AdminAdded event - as a Super Admin", async function(){
          await expect(fight.connect(_superAdmin).addAdmin(_admin.getAddress()))
            .to.emit(fight, "AdminAdded")
            .withArgs(await _admin.getAddress())
        })
        it("REVERT - when trying to add Super admin as an admin - as a Super Admin", async function(){
          await expect(fight.connect(_superAdmin).addAdmin(_superAdmin.getAddress()))
            .to.be.revertedWith("Super Admin cant be an admin")
        })
        it("REVERT - when trying to add an already approved address - as a Super Admin", async function(){
          await fight.connect(_superAdmin).addAdmin(_admin.getAddress())

          await expect(fight.connect(_superAdmin).addAdmin(_admin.getAddress()))
            .to.be.revertedWith("This address already has admin rights")
        })
        it("REVERT - add an Admin - As a NON Super Admin", async function(){
          await expect(fight.connect(_admin)
            .addAdmin(_admin.getAddress()))
            .to.be.revertedWith("You are not the super admin")
        })
      })

      /************************************
         *    METHODS Create ONLY ADMIN    *
         ************************************/

      describe("CreateFight - Create a fight", function() {
        const fighterOneName = "NGANOU"
        const fighterTwoName = "JONES"
        const arena = "UFC APEX"
        const fightType = true
        const location =  "Las Vegas, NV Etats-Unis"
        const fileCID = "bafkreia4fzl7vofaudod6qrcwi52p4tkvgnj6lsruhm7hv2n6zmof7v4wy"
        /**
         * @dev Creating a fixture allowing us to share a desired state
         * during the whole context. Here we need to have a deployed contract
         * with an assigned admin
         * @returns fight deployed instance
         */
        async function deployFightFixture(){
          await deployments.fixture(["fight"])
          const fightContractDeployed = await ethers.getContract("Fight")
          fightContractDeployed.connect(_superAdmin).addAdmin(_admin.getAddress())
          const fightFixture = fightContractDeployed.connect(_admin)
          return fightFixture
        }

        it("should CREATE a fight - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(fightFixture.createFight(
            fighterOneName, fighterTwoName, arena, location, fightType, fileLink, fileCID))
            .not.to.be.reverted
        })
        it("should CREATE and EMIT a FightCreated Event - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.createFight(fighterOneName, fighterTwoName, arena, location, fightType, fileLink, fileCID))
              .to.emit(fight, "FightCreated")
              .withArgs(fightId, await _admin.getAddress(), fighterOneName, fighterTwoName, arena, location, fightType, fileLink, fileCID)
        })
        it("REVERT - when fileCID is empty - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.createFight(fighterOneName, fighterTwoName, arena, location, fightType, fileLink, ""))
            .to.be.revertedWith("fileCID cant be empty")
        })
        it("REVERT - when fileLink is empty - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.createFight(fighterOneName, fighterTwoName, arena, location, fightType, "", fileCID))
            .to.be.revertedWith("fileLink cant be empty")
        })
        it("REVERT - when fighterOne is empty - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.createFight("", fighterTwoName, arena, location, fightType, fileLink, fileCID))
            .to.be.revertedWith("fighterOne cant be empty")
        })
        it("REVERT - when fighterTwo is empty - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.createFight(fighterOneName, "", arena, location, fightType, fileLink, fileCID))
            .to.be.revertedWith("fighterTwo cant be empty")
        })
        it("REVERT - when arena is empty - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.createFight(fighterOneName, fighterTwoName, "", location, fightType, fileLink, fileCID))
            .to.be.revertedWith("arena cant be empty")
        })
        it("REVERT - when location is empty - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.createFight(fighterOneName, fighterTwoName, arena, "", fightType, fileLink, fileCID))
            .to.be.revertedWith("location cant be empty")
        })
        it("REVERT - when create a fight - as a Super Admin", async function(){
          await deployments.fixture(["fight"])
          const fight = await ethers.getContract("Fight")
          await expect(
            fight.connect(_superAdmin).createFight(fighterOneName, fighterTwoName, arena, location, fightType, fileLink, fileCID))
            .to.be.revertedWith("You are not an admin")
        })
        it("REVERT - when create a fight - as a Guest User", async function(){
          await deployments.fixture(["fight"])
          const fight = await ethers.getContract("Fight")
          await expect(
            fight.connect(_guestUser).createFight(fighterOneName, fighterTwoName, arena, location, fightType, fileLink, fileCID))
            .to.be.revertedWith("You are not an admin")
        })
      })

      /************************************
         *    METHODS SafeMint ONLY ADMIN    *
         ************************************/

       describe("SafeMint - Mint an NFT link to a fight", function() {
        /**
         * @dev Providing an environment in which we already have
         * an admin and a fight created
         * @returns fight deployed instance
         */
        async function deployFightFixture(){
          await deployments.fixture(["fight"])
          const fightFixture = await ethers.getContract("Fight")
          await fightFixture.connect(_superAdmin).addAdmin(_admin.getAddress())
          await fightFixture.connect(_admin).createFight("NGANOU", "JONES", "UFC APEX", "Las Vegas, NV Etats-Unis", true, fileLink, metadataCID)

          return fightFixture
        }

        it("should Mint an NFT - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.connect(_admin).safeMint(fightId, tokenReceiver, metadataCID))
            .not.to.be.reverted
        })
        it("should Mint and EMIT a Transfer Event - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.connect(_admin).safeMint(fightId, tokenReceiver, metadataCID))
              .to.emit(fight, "Transfer")
        })
        it("REVERT - when mint more than one NFT for the same Fight - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)

          // Safe mint one time as an admin
          await fightFixture.connect(_admin).safeMint(fightId, tokenReceiver, metadataCID)

          await expect(
            fightFixture.connect(_admin)
            .safeMint(fightId, tokenReceiver, metadataCID))
            .to.be.revertedWith("max supply reached for this fight")
        })
        it("REVERT - when mint and NFT for a non existing Fight - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.connect(_admin).safeMint(1, tokenReceiver, metadataCID))
            .to.be.revertedWith("Fight not found")
        })
        it("REVERT - when mint and NFT - as a Super Admin", async function(){
          await expect(
            fight.connect(_superAdmin).safeMint(fightId, tokenReceiver, metadataCID))
            .to.be.revertedWith("You are not an admin")
        })
        it("REVERT - when mint more than one NFT for the same Fight - as an Super Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)

          // Safe mint one time as an admin
          await fightFixture.connect(_admin).safeMint(fightId, tokenReceiver, metadataCID)

          await expect(
            fightFixture.connect(_superAdmin)
            .safeMint(fightId, tokenReceiver, metadataCID))
            .to.be.revertedWith("You are not an admin")
        })
        it("REVERT - when mint and NFT for a non existing Fight - as a Super Admin", async function(){
          await expect(
            fight.connect(_superAdmin).safeMint(1, tokenReceiver, metadataCID))
            .to.be.revertedWith("You are not an admin")
        })
        it("REVERT - when mint and NFT - as a Guest User", async function(){
          await expect(
            fight.connect(_guestUser).safeMint(fightId, tokenReceiver, metadataCID))
            .to.be.revertedWith("You are not an admin")
        })
        it("REVERT - when mint more than one NFT for the same Fight - as a Guest", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await fightFixture.connect(_admin).safeMint(fightId, tokenReceiver, metadataCID)

          await expect(
            fightFixture.connect(_guestUser)
            .safeMint(fightId, tokenReceiver, metadataCID))
            .to.be.revertedWith("You are not an admin")
        })
        it("REVERT - when mint and NFT for a non existing Fight - as a Guest", async function(){
          await expect(
            fight.connect(_superAdmin).safeMint(1, tokenReceiver, metadataCID))
            .to.be.revertedWith("You are not an admin")
        })
      })


      /**************************************************
        * METHODS USER JOIN A FIGHT AS JUDGE - ONLY USER *
         **************************************************/

       describe("UserJoinAFightAsJudge - Add a user as a Judge", function() {
        const amountPaid = ethers.utils.parseUnits("0.059","ether")
        const userAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        const nbTicketsSold = 1

        /**
         * @dev Providing an environment in which we already have
         * an admin and a fight created
         * @returns fight deployed instance
         */
        async function deployFightFixture(){
          await deployments.fixture(["fight"])
          const fightFixture = await ethers.getContract("Fight")
          await fightFixture.connect(_superAdmin).addAdmin(_admin.getAddress())
          await fightFixture.connect(_admin).createFight("NGANOU", "JONES", "UFC APEX", "Las Vegas, NV Etats-Unis", true, fileLink, metadataCID)

          return fightFixture
        }

        it("should have a USER JOIN A FIGHT AS A JUDGE - as a User", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.connect(_guestUser)
            .userJoinAFightAsJudgeEnthusiast(fightId, userAddress, {value: amountPaid}))
            .not.to.be.reverted
        })
        it("should have a USER JOIN A FIGHT AS A JUDGE and EMIT a UserHasJoinedAFight Event - as a User", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.connect(_guestUser)
            .userJoinAFightAsJudgeEnthusiast(fightId, userAddress, {value: amountPaid}))
            .to.emit(fightFixture, "UserHasJoinedAFight")
            .withArgs(fightId, nbTicketsSold, userAddress)
        })
        it("REVERT - when not enough fonds provided - as a User", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.connect(_guestUser)
            .userJoinAFightAsJudgeEnthusiast(fightId, userAddress, {value: 0}))
            .to.be.revertedWith("Not enough fonds")
        })
        it("REVERT - when try to participate to a non existing Fight - as a User", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.connect(_guestUser)
            .userJoinAFightAsJudgeEnthusiast(1, userAddress, {value: amountPaid}))
            .to.be.revertedWith("Fight not found")
        })
        it("REVERT - when user try to have a second  judge ticket for the fight - as a User", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          fightFixture.connect(_guestUser)
            .userJoinAFightAsJudgeEnthusiast(fightId, userAddress, {value: amountPaid})
          await expect(
            fightFixture.connect(_guestUser)
            .userJoinAFightAsJudgeEnthusiast(fightId, userAddress, {value: amountPaid}))
            .to.be.revertedWith("You already joined the fight")
        })
        it("REVERT - when user try to have a judge ticket for the fight  - as a Super Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.connect(_superAdmin)
            .userJoinAFightAsJudgeEnthusiast(fightId, userAddress, {value: amountPaid}))
            .to.be.revertedWith("You are a super admin, you cant participate")
        })
        it("REVERT - when try to participate to a non existing Fight - as a Super Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.connect(_superAdmin)
            .userJoinAFightAsJudgeEnthusiast(1, userAddress, {value: amountPaid}))
            .to.be.revertedWith("You are a super admin, you cant participate")
        })
        it("REVERT - when user try to have a judge ticket for the fight  - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.connect(_admin)
            .userJoinAFightAsJudgeEnthusiast(fightId, userAddress, {value: amountPaid}))
            .to.be.revertedWith("You are an admin, you cant participate")
        })
        it("REVERT - when try to participate to a non existing Fight - as a Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.connect(_superAdmin)
            .userJoinAFightAsJudgeEnthusiast(1, userAddress, {value: amountPaid}))
            .to.be.revertedWith("You are a super admin, you cant participate")
        })
      })


      /**************************************************
        * METHODS withdraw - ONLY SUPER ADMIN *
         **************************************************/

       describe("Withdraw - Withdraw all money of the Smart Contract", function() {
        const amountPaid = ethers.utils.parseUnits("0.059","ether")
        const userAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        const nbTicketsSold = 1

        /**
         * @dev Providing an environment in which we already have
         * an admin and a fight created
         * @returns fight deployed instance
         */
        async function deployFightFixture(){
          await deployments.fixture(["fight"])
          const fightFixture = await ethers.getContract("Fight")
          await fightFixture.connect(_superAdmin).addAdmin(_admin.getAddress())
          await fightFixture.connect(_admin).createFight("NGANOU", "JONES", "UFC APEX", "Las Vegas, NV Etats-Unis", true, fileLink, metadataCID)
          await fightFixture.connect(_guestUser).userJoinAFightAsJudgeEnthusiast(fightId, userAddress, {value: amountPaid})

          return fightFixture
        }

        it("should WITHDRAW money - as a Super Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(fightFixture.connect(_superAdmin).withdraw())
            .not.to.be.reverted
        })
        it("should WITHDRAW money and EMITS WITHDRAWAL event - as a Super Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(fightFixture.connect(_superAdmin).withdraw())
            .to.emit(fightFixture, "Withdrawal")
            .withArgs(amountPaid, await _superAdmin.getAddress())
        })
        it("REVERT withdraw - when your balance is empty - as a Super Admin", async function(){
          await expect(fight.connect(_superAdmin).withdraw())
            .to.be.revertedWith("You dont have enough withdrawable balance")
        })
        it("REVERT withdraw -  when try to withdraw as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(fightFixture.connect(_admin).withdraw())
            .to.be.revertedWith("You are not the super admin")
        })
        it("REVERT withdraw -  when try to withdraw as a Guest", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(fightFixture.connect(_guestUser).withdraw())
            .to.be.revertedWith("You are not the super admin")
        })
      })


    /*******************************
      * METHODS @OVERRIDE TOKEN URI *
        ******************************/

      describe("TokenUri - Retrieving NFT", function() {
        const fileLink = "https://bafkreia4fzl7vofaudod6qrcwi52p4tkvgnj6lsruhm7hv2n6zmof7v4wy.ipfs.dweb.link/"
        const metadataCID = "ipfs://bafkreia4fzl7vofaudod6qrcwi52p4tkvgnj6lsruhm7hv2n6zmof7v4wy"
        const fightId = 0;
        const tokenReceiver = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

        /**
         * @dev Providing an environment in which we already have
         * an admin and a fight created
         * @returns fight deployed instance
         */
        async function deployFightFixture(){
          await deployments.fixture(["fight"])
          const fightFixture = await ethers.getContract("Fight")
          await fightFixture.connect(_superAdmin).addAdmin(_admin.getAddress())
          await fightFixture.connect(_admin).createFight("NGANOU", "JONES", "UFC APEX", "Las Vegas, NV Etats-Unis", true, fileLink, metadataCID)

          return fightFixture
        }

        it("should get the appropriate NFT when the tokenId exist - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          const transaction = await fightFixture.connect(_admin).safeMint(fightId, tokenReceiver, metadataCID)
          const eventTransfer = await transaction.wait();
          const tokenId = eventTransfer.events[0].args.tokenId;

          expect(
            await fightFixture.connect(_admin)
            .tokenURI(tokenId))
            .to.be.equal(metadataCID)
        })
        it("should get the appropriate NFT when the tokenId exist - as a Super Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          const transaction = await fightFixture.connect(_admin).safeMint(fightId, tokenReceiver, metadataCID)
          const eventTransfer = await transaction.wait();
          const tokenId = eventTransfer.events[0].args.tokenId;

          expect(
            await fightFixture.connect(_superAdmin)
            .tokenURI(tokenId))
            .to.be.equal(metadataCID)
        })
        it("should get the appropriate NFT when the tokenId exist - as a Super Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          const transaction = await fightFixture.connect(_admin).safeMint(fightId, tokenReceiver, metadataCID)
          const eventTransfer = await transaction.wait();
          const tokenId = eventTransfer.events[0].args.tokenId;

          expect(
            await fightFixture.connect(_guestUser)
            .tokenURI(tokenId))
            .to.be.equal(metadataCID)
        })
        it("REVERT to get the  appropriate NFT when the tokenId doesnt exist - as an Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          const tokenId = 0x777

          await expect(
            fightFixture.connect(_admin)
            .tokenURI(tokenId))
            .to.be.revertedWith("This token does not exist")
        })
        it("REVERT to get the  appropriate NFT when the tokenId doesnt exist - as a Super Admin", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          const tokenId = 0x777

          await expect(
            fightFixture.connect(_superAdmin)
            .tokenURI(tokenId))
            .to.be.revertedWith("This token does not exist")
        })
        it("REVERT to get the  appropriate NFT when the tokenId doesnt exist - as a User", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          const tokenId = 0x777

          await expect(
            fightFixture.connect(_guestUser)
            .tokenURI(tokenId))
            .to.be.revertedWith("This token does not exist")
        })
      })
    })
  })
