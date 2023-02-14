// const { network } = require("hardhat")
// const { developmentChains } = require("../helper-hardhat-config")
// const { verify } = require("../utils/verify")
    
// module.exports = async({ getNamedAccounts, deployments }) => {
//   const { deploy, log } = deployments
//   const { deployer } = await getNamedAccounts()
//   const SAMAPAPER_TOWN_HALL_CONTRACT_ADDRESS = "";  

//   log("Deployment in progress ...");

//   arguments = [SAMAPAPER_TOWN_HALL_CONTRACT_ADDRESS]
//   const SamaPaperUserFactory = await deploy("SamaPaperUserFactory", {
//     from: deployer,
//     args: arguments,
//     log: true,
//     waitConfirmations: 5
//   })

//   log("Deployment done !")

//   //Verify the smart contract 
//   // if(!developmentChains.includes(network.name) && process.env.ETHERSCAN) {
//   //   log("Verifying...")
//   //   await verify(SamaPaperUserFactory.address, arguments)
//   // }
// }

// module.exports.tags = ["all", "voting", "main"]