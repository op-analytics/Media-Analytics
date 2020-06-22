import axios from 'axios';

import config from '../config';

const API_URL = config.apiUrl;

/**
 * A service to make requests to the api.
 * The data received in each function will match the
 * schemas defined in the backend
 */
export default {
  /**
   * Retrieve the latent associations from the api for the given data
   *
   * @param {Object} requestData The data to call the api endpoint with
   * @returns {Object[]}
   */
  async getAssociations(requestData) {
    const { data } = await axios.post(
      `${API_URL}/timeline/latent-association`,
      requestData,
    );
    const { data: associationData } = data;
    return associationData;
  },

  /**
   * Retrieve the sentiments from the api for the given data
   *
   * @param {Object} requestData The data to call the api endpoint with
   * @returns {Object[]}
   */
  async getSentiments(requestData) {
    const { data } = await axios.post(
      `${API_URL}/timeline/sentiment`,
      requestData,
    );
    const { data: sentiments } = data;
    return sentiments;
  },

  /**
   * Retrieve the frequencies from the api for the given data
   *
   * @param {Object} requestData The data to call the api endpoint with
   * @returns {Object[]}
   */
  async getFrequencies(requestData) {
    const { data } = await axios.post(
      `${API_URL}/timeline/frequency`,
      requestData,
    );
    return data;
  },
};
