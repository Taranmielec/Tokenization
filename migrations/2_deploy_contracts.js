const { default: Web3 } = require("web3");

var NGToken = artifacts.require("./NGToken.sol")
var MyTokenSales = artifacts.require("./MyTokenSale.sol");
var KycContract = artifacts.require("./KycContract.sol");
require('dotenv').config({path: './.env'});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(NGToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(MyTokenSales, 1, addr[0], NGToken.address, KycContract.address);
    let tokenInstance = await NGToken.deployed();
    await tokenInstance.transfer(MyTokenSales.address, process.env.INITIAL_TOKENS);
};