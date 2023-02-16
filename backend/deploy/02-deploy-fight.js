const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const SUPERADMIN = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  log("Deployment in progress ...");

  arguments = [SUPERADMIN]
  const Fight = await deploy("Fight", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: 0
  })
  
  log("Deployment done !")

  //Verify the smart contract
  if(!developmentChains.includes(network.name) && process.env.ETHERSCAN) {
    log("Verifying...")
    await verify(Fight.address, arguments)
  }
}

module.exports.tags = ["all", "fight", "main"]