const Frequency = require('../models/frequency.model');
const { FrequencySchema } = require('../schemas');

module.exports = (function() {
  const sortOnKey = (objects, key) => {
    for (object of objects) {
      object.data.sort((x, y) => x[key] - y[key]);
    }
  };

  const GetFrequency = async (req, res) => {
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
    const cleanedWords = value.words.map((word)=>word.trim().toLowerCase());
    const frequencyDataDB = await Frequency.find({
      word: cleanedWords,
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
