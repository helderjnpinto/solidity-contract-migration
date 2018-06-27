/* global describe it artifacts */
const Proxy = artifacts.require("Proxy");

const ContractLogicV1 = artifacts.require("migrations/v1");
const ContractLogicV2 = artifacts.require("migrations/v2");


contract("| Storage and upgradability example | ", async accounts => {
    // beforeEach('create a proxy contract', async function () {
    // });
    
    let proxyContract;
    
    it("deploy version 1 of contract", async () => {
        
        const contractLogicV1 = await ContractLogicV1.new();

        proxyContract = await Proxy.new(contractLogicV1.address)
        
        // proxyContract = ContractLogicV1.at(proxyContract.address);
        proxyContract = _.extend(proxyContract, ContractLogicV1.at(proxyContract.address));
        
        await proxyContract.setVersion(1);
        const version = await proxyContract.getVersionNumber();
        
        assert.equal(version, 1, "version 1 is set");
    });
    
    it("deploy version 2 of contract", async () => {
        const contractLogicV2 = await ContractLogicV2.new();
        const receiptUpgrade = await proxyContract.upgradeTo(contractLogicV2.address);

        assert.equal(receiptUpgrade.logs.length, 1, 'triggers one event');
        assert.equal(receiptUpgrade.logs[0].event, 'Upgraded', 'should be the "Upgraded" event');
        assert.equal(receiptUpgrade.logs[0].args.implementation, contractLogicV2.address, 'logs the new version of logic contract');

        proxyContract = _.extend(proxyContract, ContractLogicV2.at(proxyContract.address));

        await proxyContract.setV(2);
        const version = await proxyContract.getV();
        console.log('B: ​version:', version.toNumber());

        assert.equal(version, 2, "version 2 is set");
    });

});
