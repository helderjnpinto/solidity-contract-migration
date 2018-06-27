/* global describe it artifacts */
const Proxy = artifacts.require("Proxy");

const ContractLogicV1 = artifacts.require("migrations/v1");
const ContractLogicV2 = artifacts.require("migrations/v2");


contract("Storage and upgradability example v1", async accounts => {
    let proxyContract;

    beforeEach('create a proxy contract', async function () {
        proxyContract = await Proxy.new()
        console.log('​ProxyContract address: ', proxyContract);
    });
  


    it("deploy version 1 of contract", async () => {
        const contractLogicV1 = await ContractLogicV1.new();
        
        const responseUpgrade = await proxyContract.upgradeTo(contractLogicV1.address);
        console.log('​responseUgrade', responseUpgrade);
    
        proxyInstanceV1 = contractLogicV1.at(proxyContract.address);
        const version = await proxyInstanceV1.getVersionNumber()
        console.log('​version', version);
    });


//     it("deploy version 1 of contract", async () => {
//     const contractLogicV1 = await ContractLogicV1.new();
    
//     await proxy.upgradeTo(contractLogicV1.address);

//     proxy = _.extend(proxy, DelegateV1.at(proxy.address));

//     await proxy.setNumberOfOwners(10);

//     let numOwnerV1 = await proxy.getNumberOfOwners();

//     console.log(numOwnerV1.toNumber());

//     await proxy.upgradeTo(delegateV2.address);

//     proxy = DelegateV2.at(proxy.address);

//     let previousOwnersState = await proxy.getNumberOfOwners();

//     console.log(previousOwnersState.toNumber());

//     await proxy.setNumberOfOwners(20, { from: accounts[2] });

//     let numOfownersV2 = await proxy.getNumberOfOwners();

//     console.log(numOfownersV2.toNumber());
//   });
});
