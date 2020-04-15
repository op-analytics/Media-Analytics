const Frequency = require('../models/frequency.model');
const { FrequencySchema } = require('../schemas');

module.exports = (function() {
  const sortOnKey = (objects, key) => {
    for (object of objects) {
      object.data.sort((x, y) => x[key] - y[key]);
    }
  };

  const GetFrequency = async (req, res) => {
    // Validate parameters against the schema.
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
    // Retrieve the data from the database.
    const frequencyDataDB = await Frequency.find({
      word: value.words,
      year: { $gte: value.year_from, $lte: value.year_to },
      media_outlet: value.media_outlets,
    });
    // Check if there is data in the database for the given parameters.
    if (frequencyDataDB.length > 0) {
      let frequencyData = [];
      // Iterate over the data returned from the database in order to restructure it.
      for (frequencyDataObj of frequencyDataDB) {
        let word = frequencyDataObj.word;
        let media_outlet = frequencyDataObj.media_outlet;
        let wordData = {
          year: frequencyDataObj.year,
          rank: frequencyDataObj.rank,
          count: frequencyDataObj.count,
          freq: frequencyDataObj.freq,
          rel_freq: frequencyDataObj.rel_freq,
        };
        let wordDataIndex = frequencyData.findIndex(fd => fd.word == word);
        // Check if the key for the word does not already exist.
        if (wordDataIndex == -1) {
          frequencyData.push({
            word: word,
            data: { [media_outlet]: [wordData] },
          });
        } else {
          // Check if the key for the media outlet does not already exist.
          if (!frequencyData[wordDataIndex].data[media_outlet]) {
            frequencyData[wordDataIndex].data[media_outlet] = [wordData];
          } else {
            frequencyData[wordDataIndex].data[media_outlet].push(wordData);
          }
        }
      }
      // Sort each word's dataset by year.
      //sortOnKey(frequencyData, 'year');
      // Set data in response to frequencyData.
      res.json({ data: frequencyData });
      return;
    }
    // If there is not data for the parameters, return an error.
    res.status(404).json({
      error: 'No frequency data was found for given parameters',
    });
  };

  return {
    GetFrequency,
  };
})();
