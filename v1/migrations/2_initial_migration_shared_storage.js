var Proxy = artifacts.require("./Proxy.sol");
var cv1 = artifacts.require("./migrations/v1.sol");

module.exports = function(deployer) {
  deployer.deploy(cv1).then(function(cv1Instance) {
  console.log('​module.exports -> cv1Instance', cv1Instance.address);
    
    return deployer.deploy(Proxy, cv1Instance.address).then(function(ProxyInstance) {
    console.log('​module.exports -> ProxyInstance', ProxyInstance.address);

    });
  });
};
