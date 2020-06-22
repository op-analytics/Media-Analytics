import client from '@/redis';

import User from '../interfaces/User';

/**
 * Gets a users token key
 *
 * @param user - The user to get the token key for
 * @returns The users token key
 */
function getUserTokenKey(user: User): string {
  return `${user._id}_tokens`;
}

export default {
  /**
   * Gets the number of tokens a users has used
   *
   * @param user - The user to get the number of used tokens for
   * @returns The number of tokens a user has used
   */
  async getUsedTokens(user: User): Promise<number> {
    return Number(await client.get(getUserTokenKey(user)));
  },

  /**
   * Checks if a user has tokens available
   *
   * @param user - The user to check
   * @returns Whether or not a user has available tokens
   */
  async userHasTokens(user: User): Promise<boolean> {
    const currentTokens = await this.getUsedTokens(user);
    return currentTokens < user.limit;
  },

  /**
   * Uses one of the users available tokens
   *
   * @param user - The user to spend a token from
   */
  async useToken(user: User): Promise<void> {
    const currentTokens = await this.getUsedTokens(user);
    if (currentTokens < user.limit) {
      client.set(getUserTokenKey(user), `${currentTokens + 1}`);
    }
    throw new Error(
      `User ${user._id}: Attempted to use tokens that did not exist`,
    );
  },

  /**
   * Resets a users used tokens
   *
   * @param user - The user to reset tokens for
   */
  async resetUserTokens(user: User): Promise<void> {
    client.set(getUserTokenKey(user), '0');
  },
};
