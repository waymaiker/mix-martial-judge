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
          await expect(user.create("Jason", "Tyson", "jason@tyson.com", "trinidad and tobago", 1676376430)).not.to.be.reverted
        })
        
        it("REVERT - when a same account tries to create a user more than once", async function(){
          user.create("Jason", "Tyson", "jason@tyson.com", "trinidad and tobago", 1676376430)

          await expect(
            user.create("Mike", "Bereal", "mike@bereal.com", "st lucia", 1676376430))
            .to.be.revertedWith("You already have an account")
        })

        it("REVERT - when firstname is empty", async function(){
          await expect(
            user.create("", "Tyson", "jason@tyson.com", "trinidad and tobago", 1676376430))
            .to.be.revertedWith("firstname cant be empty")
        })

        it("REVERT - when lastname is empty", async function(){
          await expect(
            user.create("Jason", "", "jason@tyson.com", "trinidad and tobago", 1676376430))
            .to.be.revertedWith("lastname cant be empty")
        })

        it("REVERT - when email is empty", async function(){
          await expect(
            user.create("Jason", "Tyson", "", "trinidad and tobago", 1676376430))
            .to.be.revertedWith("email cant be empty")
        })

        it("REVERT - when country is empty", async function(){
          await expect(
            user.create("Jason", "Tyson", "jason@tyson.com", "", 1676376430))
            .to.be.revertedWith("country cant be empty")
        })
      })
      
      // describe("GET", function() {
      //   it("should GET a user", async function(){
      //     await expect(
      //       user.create("Jason", "Tyson", "jason@tyson.com", "trinidad and tobago", 1676376430)
      //     )

      //     await expect(user.getUser()).not.to.be.reverted
      //   })
        
      //   it("REVERT -  when an account with not registered is trying to his data  ", async function(){
      //     await expect(
      //       user.connect(guessAccount).getUser())
      //       .to.be.revertedWith("You dont have an account")          
      //   })
      // })
    })
})