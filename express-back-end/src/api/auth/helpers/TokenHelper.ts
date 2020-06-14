import client from '@/redis';

import User from '../interfaces/User';

function getUserTokenKey(user: User): string {
  return `${user._id}_tokens`;
}

export default {
  async getUsedTokens(user: User): Promise<number> {
    return Number(await client.get(getUserTokenKey(user)));
  },
  async userHasTokens(user: User): Promise<boolean> {
    const currentTokens = await this.getUsedTokens(user);
    return currentTokens < user.limit;
  },
  async useToken(user: User): Promise<void> {
    const currentTokens = await this.getUsedTokens(user);
    if (currentTokens < user.limit) {
      client.set(getUserTokenKey(user), `${currentTokens + 1}`);
    }
    throw new Error(
      `User ${user._id}: Attempted to use tokens that did not exist`,
    );
  },
  async resetUserTokens(user: User): Promise<void> {
    client.set(getUserTokenKey(user), '0');
  },
};
