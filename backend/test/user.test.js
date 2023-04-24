const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Units tests METHODS of User smart contract", function(){
    let accounts;
    let user;
    before(async () => {
      accounts = await ethers.getSigners()
      deployer = accounts[0]
      guessAccount = accounts[1]
    })

    describe("Deployment", function() {
      it("should deploy the smart contract", async function() {
        await deployments.fixture(["user"])
        user = await ethers.getContract("User")
      })
    })

    describe("Tests: METHODS", function() {
      beforeEach(async() => {
        await deployments.fixture(["user"])
        user = await ethers.getContract("User")
      })

      describe("Create", function() {
        it("should CREATE a user", async function(){
          await expect(
            user.create("Jason")).not.to.be.reverted
        })
        it("REVERT - when a same account tries to create a user more than once", async function(){
          user.create("Jason")

          await expect(
            user.create("Mike"))
            .to.be.revertedWith("You already have an account")
        })
        it("REVERT - when pseudo is empty", async function(){
          await expect(
            user.create(""))
            .to.be.revertedWith("pseudo cant be empty")
        })
      })


      /**
       * @dev Here I tried to replicate the reception of an ERC721.
       * As I said into the contract methods description, a TODO might be
       * to try ensure that on top of receiving an ERC721, it should only receive
       * a token from the Fight contract
       */

      describe("onERC721Received", function() {
        const fileLink = "https://bafkreia4fzl7vofaudod6qrcwi52p4tkvgnj6lsruhm7hv2n6zmof7v4wy.ipfs.dweb.link/"
        const metadataCID = "ipfs://bafkreia4fzl7vofaudod6qrcwi52p4tkvgnj6lsruhm7hv2n6zmof7v4wy"
        const fightId = 0

        async function FightFixtureEmittedEvents(){
          await deployments.fixture(["fight"])
          const fightFixture = await ethers.getContract("Fight")
          const admin = accounts[1]
          await fightFixture.addAdmin(admin.getAddress())
          await fightFixture.connect(admin).createFight("NGANOU", "JONES", "UFC APEX", "Las Vegas, NV Etats-Unis", true, fileLink, metadataCID)
          const transacation = await fightFixture.connect(admin).safeMint(fightId, user.address, metadataCID)
          const eventEmitted = await transacation.wait()

          return eventEmitted.events
        }

        it("should Receive a token", async function(){
          const fightFixture = await loadFixture(FightFixtureEmittedEvents)
          const event = fightFixture[0].args

          expect(
           await user.onERC721Received(
            event.from,
            event.to,
            event.tokenId,
            ethers.utils.formatBytes32String("This is it"))
          ).not.to.be.null
        })
      })
    })
})