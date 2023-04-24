const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Units tests METHODS of UserFactory smart contract", function(){
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
        userFactoryFactory = await ethers.getContractFactory("UserFactory");
        userFactory = await userFactoryFactory.deploy(user.address)
      })
    })

    /******************
      * METHODS CREATE *
        *****************/

    describe("Create - Create a user", function() {
      beforeEach(async() => {
        await deployments.fixture(["user"])
        user = await ethers.getContract("User")
        userFactoryFactory = await ethers.getContractFactory("UserFactory");
        userFactory = await userFactoryFactory.deploy(user.address)
      })

      it("should CREATE a user ", async function(){
        await expect(
          userFactory.create("Jason"))
          .not.to.be.reverted
      })
      it("should CREATE a user and EMITS UserCreated event", async function(){
        const transaction = await userFactory.create("Jason")
        const userFactoryEvents = await transaction.wait()
        const userContractAddress = userFactoryEvents.events[0].args.userContractAddress
        const userAddress = userFactoryEvents.events[0].args.userAddress

        await expect(transaction)
          .to.emit(userFactory, "UserCreated")
          .withArgs(userContractAddress, userAddress, "Jason")
      })
      it("REVERT - when the same user wants to create more than one account", async function(){
        userFactory.create("Jason")

        await expect(
          userFactory.create("Mike"))
          .to.be.revertedWith("You already have an account")
      })
      it("REVERT - when pseudo is empty", async function(){
        await expect(
          userFactory.create(""))
          .to.be.revertedWith("pseudo cant be empty")
      })
    })

    /***********************************************************
      * METHODS UPDATE USER PROXY CONTRACT ADDRESS - ONLY OWNER *
        **********************************************************/

     describe("UpdateUserProxyContractAddress - Update the user proxy contract address", function() {
      beforeEach(async() => {
        await deployments.fixture(["user"])
        user = await ethers.getContract("User")
        userFactoryFactory = await ethers.getContractFactory("UserFactory");
        userFactory = await userFactoryFactory.deploy(user.address)
        userProxyContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      })

      it("should UPDATE UserProxyContractAddress - as the Owner", async function(){
        await expect(
          userFactory.updateUserProxyContractAddress(userProxyContractAddress))
          .not.to.be.reverted
      })
      it("should UPDATE UserProxyContractAddress and EMITS UserProxyContractAddressUpdated event - as the Owner", async function(){
        const transaction = await userFactory.updateUserProxyContractAddress(userProxyContractAddress)
        const userFactoryEvents = await transaction.wait()
        const previousUserProxyContractAddress = userFactoryEvents.events[0].args.previousUserProxyContractAddress
        const newUserProxyContractAddress = userFactoryEvents.events[0].args.newUserProxyContractAddress

        await expect(transaction)
          .to.emit(userFactory, "UserProxyContractAddressUpdated")
          .withArgs(previousUserProxyContractAddress, newUserProxyContractAddress)
      })
      it("REVERT - when trying to UPDATE user proxy contract address with the same contract address - as the Owner", async function(){
        await userFactory.updateUserProxyContractAddress(userProxyContractAddress)

        await expect(
          userFactory.updateUserProxyContractAddress(userProxyContractAddress))
          .to.be.revertedWith("This address is already used as the proxy")
      })
      it("REVERT - when trying to UPDATE user proxy contract address with an address that is not a contract - as the Owner", async function(){
        expect(
          userFactory.updateUserProxyContractAddress("0x70997970C51812dc3A010C7d01b50e0d17dc79C8"))
          .to.be.revertedWith("Provided address is not valid")
      })
      it("REVERT - when UPDATE UserProxyContractAddress - as Non Owner", async function(){
        await expect(
          userFactory.connect(guessAccount).updateUserProxyContractAddress(userProxyContractAddress))
          .to.be.revertedWith("Ownable: caller is not the owner")
      })
    })
})