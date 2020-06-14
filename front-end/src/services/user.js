import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : process.env.REACT_APP_API_URL;

export default {
  async signup(userData) {
    const { data } = await axios.post(`${API_URL}/auth/signup`, userData);
    const { token } = data;
    return token;
  },

  async login(userData) {
    const { data } = await axios.post(`${API_URL}/auth/login`, userData);
    const { token } = data;
    return token;
  },

  async getLoggedInUser() {
    const { data: user } = await axios.get(`${API_URL}/auth/user`);
    return user;
  },

  async resendEmail(email) {
    await axios.post(`${API_URL}/auth/confirm/resend`,{email});
  },

  logout() {
    localStorage.removeItem('XAuthToken');
    delete axios.defaults.headers.common.Authorization;
  },

  authenticate(token) {
    const XAuthToken = `${token}`;
    localStorage.setItem('XAuthToken', XAuthToken);
    axios.defaults.headers.common.Authorization = XAuthToken;
  },
};
