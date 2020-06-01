import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : process.env.REACT_APP_API_URL;

export default {
  async getAssociations(requestData) {
    const { data } = await axios.post(
      `${API_URL}/timeline/latent-association`,
      requestData,
    );
    const { data: associationData } = data;
    return associationData;
  },

  async getSentiments(requestData) {
    const { data } = await axios.post(
      `${API_URL}/timeline/sentiment`,
      requestData,
    );
    const { data: sentiments } = data;
    return sentiments;
  },

  async getFrequencies(requestData) {
    const { data } = await axios.post(
      `${API_URL}/timeline/frequency`,
      requestData,
    );
    const { data: frequencyData } = data;
    return frequencyData
  },
};
