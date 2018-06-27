const Proxy = artifacts.require("./Proxy.sol");
const KeyValueStorage = artifacts.require("./KeyValueStorage.sol");

module.exports = function(deployer) {
  console.log("​deployer", deployer);
  // Use deployer to state migration tasks.
  deployer.deploy(KeyValueStorage).then(function(keystorage) {
    console.log("XXX ​keystorage Address XXXX: ", keystorage.address);

    return deployer
      .deploy(
        Proxy,
        keystorage.address,
        "0xa945e45E5599FD5840ddA23Bd1Aa34BaDec9f3C4"
      )
      .then(function(proxyInstance) {
        console.log("XXXX ProxyInstance XXXX:", proxyInstance);
      });
  });
};
