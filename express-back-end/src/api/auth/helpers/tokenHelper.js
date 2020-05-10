const client = require('../../../redis');

module.exports = class TokenHelper {
  constructor(user) {
    this.tokenKey = `${user._id}_tokens`;
    this.limit = user.tokenLimit;
    this.userId = user._id;
  }

  async usedTokens() {
    const userTokens = await client.get(this.tokenKey);
    return userTokens ? userTokens : 0;
  }

  async hasTokens() {
    return (await this.usedTokens()) < this.limit;
  }

  async useToken() {
    const currentTokens = await this.usedTokens();
    if (currentTokens < this.limit) {
      client.set(this.tokenKey, currentTokens + 1);
      return true;
    }
    console.log(`User ${this.userId}: Attempted to use tokens that did not exist`);
    return false;
  }

  async resetTokens() {
    client.set(this.tokenKey, 0);
  }
};
