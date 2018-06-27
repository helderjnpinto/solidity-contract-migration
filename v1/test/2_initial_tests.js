/* global describe it artifacts */
const Proxy = artifacts.require("Proxy");

const ContractLogicV1 = artifacts.require("migrations/v1");
const ContractLogicV2 = artifacts.require("migrations/v2");


contract("| Storage and upgradability example | ", async accounts => {
    // beforeEach('create a proxy contract', async function () {
    // });
    
    let proxyContract;
    
    it("Deploy version 1 of contract", async () => {
        const contractLogicV1 = await ContractLogicV1.new();
        
        proxyContract = await Proxy.new(contractLogicV1.address)
        
        //TODO: check other ways to call ContractLogic without _.extend

        // proxyContract = ContractLogicV1.at(proxyContract.address);
        proxyContract = _.extend(proxyContract, ContractLogicV1.at(proxyContract.address));
        
        await proxyContract.setVersion(1);
        const version = await proxyContract.getVersionNumber();
        
        assert.equal(version.toNumber(), 1, "version 1 is set");
    });
    
    it("Deploy version 2 of contract", async () => {
        const contractLogicV2 = await ContractLogicV2.new();
        const receiptUpgrade = await proxyContract.upgradeTo(contractLogicV2.address);

        assert.equal(receiptUpgrade.logs.length, 1, 'triggers one event');
        assert.equal(receiptUpgrade.logs[0].event, 'Upgraded', 'should be the "Upgraded" event');
        assert.equal(receiptUpgrade.logs[0].args.implementation, contractLogicV2.address, 'logs the new version of logic contract');

        proxyContract = _.extend(proxyContract, ContractLogicV2.at(proxyContract.address));

        await proxyContract.setV(2);
        const version = await proxyContract.getV();

        assert.equal(version.toNumber(), 2, "version 2 is set");
    });

    it("Check if other account can change version of implementation", async () => {
        
        const contractLogicV2 = await ContractLogicV2.new();
        const notOwnerAccount = accounts[2];
        
        let receiptUpgrade;
        
        try {
            receiptUpgrade = await proxyContract.upgradeTo(contractLogicV2.address, { from: notOwnerAccount });
        } catch(error) {
            const invalidOwnerAccount = error.message.indexOf('revert' >= 0);
            // TODO: When we contract A calls contract B, and B throws, instead
            //       of an 'invalid jump', we get an 'out of gas' error. How do
            //       we distinguish this from an actual out of gas event? (The
            //       testrpc log actually show an 'invalid jump' event.)
            const outOfGas = error.message.search('out of gas') >= 0;

            assert(
                invalidOwnerAccount || outOfGas,
                "Expected throw, got '" + error + "' instead",
              );
            return;
        };
        
        assert.fail('Expected throw not received');
    });

});
