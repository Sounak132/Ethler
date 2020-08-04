const contract = artifacts.require("Gamble");

module.exports = function(deployer) {
  deployer.deploy(contract, {value: web3.utils.toWei("10","ether"), gas: 6000000});
};
