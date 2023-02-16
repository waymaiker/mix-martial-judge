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

    describe("Tests: METHODS", function() {

      /*************************************
       * METHODS AddAdmin  ONLY SUPER ADMIN *
       **************************************/

      describe("AddAdmin", function(){
        beforeEach(async() => {
          await deployments.fixture(["fight"])
          fight = await ethers.getContract("Fight")
        })
  
        it("should ADD an ADMIN - only Super Admin", async function(){
          await expect(fight.connect(_superAdmin).addAdmin(_admin.getAddress())).not.to.be.reverted
        })
        it("should ADD an ADMIN and EMITS AdminAdded event ", async function(){
          await expect(fight.connect(_superAdmin).addAdmin(_admin.getAddress()))
            .to.emit(fight, "AdminAdded")
            .withArgs(await _admin.getAddress())
        })        
        it("REVERT - when trying to add an already approved address", async function(){
          await fight.connect(_superAdmin).addAdmin(_admin.getAddress())

          await expect(fight.connect(_superAdmin).addAdmin(_admin.getAddress()))
            .to.be.revertedWith("This address already has admin rights")
        })
        it("REVERT - when it's not superAdmin trying to ADD an ADMIN", async function(){
          await expect(fight.connect(_admin)
            .addAdmin(_admin.getAddress()))
            .to.be.revertedWith("You are not the super admin")
        })
      })

      /************************************
         *    METHODS Create ONLY ADMIN    *
         ************************************/

      describe("Create", function() {
        const fileLink = "https://bafkreia4fzl7vofaudod6qrcwi52p4tkvgnj6lsruhm7hv2n6zmof7v4wy.ipfs.dweb.link/"
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

        it("should CREATE a fight", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(fightFixture.create(
            "NGANOU", "JONES", "UFC APEX", "Las Vegas, NV Etats-Unis", true, fileLink, fileCID))
            .not.to.be.reverted
        })
        it("should create and EMIT a FightCreated Event ", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.create("NGANOU", "JONES", "UFC APEX", "Las Vegas, NV Etats-Unis", true, fileLink, fileCID))
              .to.emit(fight, "FightCreated")
              .withArgs(0, await _admin.getAddress(), "NGANOU", "JONES", "UFC APEX", "Las Vegas, NV Etats-Unis", true, fileLink, fileCID)
        })
        it("REVERT - when fileCID is empty", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.create("NGANOU", "JONES", "UFC APEX", "Las Vegas, NV Etats-Unis", true, fileLink, ""))
            .to.be.revertedWith("fileCID cant be empty")
        })
        it("REVERT - when fileLink is empty", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.create("NGANOU", "JONES", "UFC APEX", "Las Vegas, NV Etats-Unis", true, "", fileCID))
            .to.be.revertedWith("fileLink cant be empty")
        })
        it("REVERT - when fighterOne is empty", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.create("", "JONES", "UFC APEX", "Las Vegas, NV Etats-Unis", true, fileLink, fileCID))
            .to.be.revertedWith("fighterOne cant be empty")
        })
        it("REVERT - when fighterTwo is empty", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.create("NGANOU", "", "UFC APEX", "Las Vegas, NV Etats-Unis", true, fileLink, fileCID))
            .to.be.revertedWith("fighterTwo cant be empty")
        })
        it("REVERT - when arena is empty", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.create("NGANOU", "JONES", "", "Las Vegas, NV Etats-Unis", true, fileLink, fileCID))
            .to.be.revertedWith("arena cant be empty")
        })
        it("REVERT - when location is empty", async function(){
          const fightFixture = await loadFixture(deployFightFixture)
          await expect(
            fightFixture.create("NGANOU", "JONES", "UFC APEX", "", true, fileLink, fileCID))
            .to.be.revertedWith("location cant be empty")
        })
      })
    })
  })
