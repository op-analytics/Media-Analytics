import axios from 'axios';

import config from '../config';

const API_URL = config.apiUrl;

/**
  A service to help make requests to the api and
 * manage authention. The data received in each
 * function will match the schemas defined in the backend
 */
export default {
  /**
   * Signup a user using the given user data
   *
   * @param {Object} userData The data to call the api endpoint with
   * @returns {String} The token for the user to be authenticated with
   */
  async signup(userData) {
    await axios.post(`${API_URL}/auth/signup`, userData);
  },

  /**
   * Gets a users token from the API using there credentials
   *
   * @param {Object} userData The data to call the api endpoint with
   * @returns {String} The token for the user to be authenticated with
   */
  async login(userData) {
    const { data } = await axios.post(`${API_URL}/auth/login`, userData);
    const { token } = data;
    return token;
  },

  /**
   * Gets the data for the current authenticated user
   *
   * @returns {Object} The user data for the current logged in user
   */
  async getLoggedInUser() {
    const { data: user } = await axios.get(`${API_URL}/auth/user`);
    return user;
  },

  /**
   * Calls the api to resend the confirmation email
   *
   * @param {String} email The email to try send the confirmation email to
   * @returns {Object} The user data for the current logged in user
   */
  async resendEmail(email) {
    await axios.post(`${API_URL}/auth/confirm/resend`, { email });
  },

  /**
   * Logout by removing the XAuthToken from localStorage and axios default
   * headers
   *
   */
  logout() {
    localStorage.removeItem('XAuthToken');
    delete axios.defaults.headers.common.Authorization;
  },

  /**
   * Authenticates a user using the given token
   *
   */
  authenticate(token) {
    localStorage.setItem('XAuthToken', token);
    axios.defaults.headers.common.Authorization = token;
  },
};
