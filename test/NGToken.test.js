const Token = artifacts.require("NGToken");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;
require('dotenv').config({path: '../.env'});

contract("Token Test", async accounts => {

    const [initialHolder, recipient, anotherAccount] = accounts;

    beforeEach(async() => {
        this.NGToken = await Token.new(process.env.INITIAL_TOKENS);
    });

    it("all tokens shuld be in my account", async () => {
        let instance = this.NGToken;
        let totalSupply = await instance.totalSupply();
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("is possible to send tokens between accounts", async() => {
        const sendTokens = 1;
        let instance = this.NGToken;
        let totalSupply = await instance.totalSupply();
       await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });
    
    it("It's not possible to send more tokens then account 1 has", async () => {
        let instance = this.NGToken;
        let balanceOfAccount = await instance.balanceOf(initialHolder);
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);  
      });
});