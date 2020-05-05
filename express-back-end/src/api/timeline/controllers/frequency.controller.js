const Frequency = require('../models/frequency.model');
const { FrequencySchema } = require('../schemas');
const TokenHelper = require('../../auth/helpers/tokenHelper');

module.exports = (function() {
  const sortOnKey = (objects, key) => {
    for (object of objects) {
      object.data.sort((x, y) => x[key] - y[key]);
    }
  };

  const GetFrequency = async (req, res) => {
    const userTokenHelper = new TokenHelper(req.user);

    // Responed with an error if the user has no tokens available
    if (!userTokenHelper.hasTokens()) {
      res.status(429).json({
        message: 'No tokens available to make this request',
      });
      return;
    }
    const { error, value } = FrequencySchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      res.status(422).json({
        errors: error.details.map(error => ({
          value: error.path,
          message: error.message,
        })),
      });
      return;
    }
    const frequencyDataDB = await Frequency.find({
      word: value.words,
      year: { $gte: value.year_from, $lte: value.year_to },
    });

    if (frequencyDataDB.length > 0) {
      let frequencyData = [];
      for (frequencyDataObj of frequencyDataDB) {
        let word = frequencyDataObj.word;
        let dataIndex = frequencyData.findIndex(fd => fd.word == word);
        let wordData = {
          year: frequencyDataObj.year,
          rank: frequencyDataObj.rank,
          count: frequencyDataObj.count,
          freq: frequencyDataObj.freq,
        };
        if (dataIndex == -1) {
          frequencyData.push({ word: word, data: [wordData] });
        } else {
          // If the word already exists in frequency data,
          // just append the current year's data.
          frequencyData[dataIndex].data.push(wordData);
        }
      }
      // Sort each word's dataset by year
      sortOnKey(frequencyData, 'year');
      res.json({ data: frequencyData });
      // Use one of the users tokens
      userTokenHelper.useToken();
      return;
    }
    res.status(404).json({
      error: 'No frequency data was found for given parameters',
    });
  };

  return {
    GetFrequency,
  };
})();
