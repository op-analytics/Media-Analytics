const Frequency = require('../models/frequency.model');
const { FrequencySchema } = require('../schemas');

function multipleDatasets(responseData) {
  let result = [];
  responseData.map(wordDataset => {
    for (const mediaOutlet in wordDataset.data) {
      let mediaOutletData = [];
      wordDataset.data[mediaOutlet].map(wordData => {
        // Creating keys for the year data using using the media outlet and word.
        let yearObject = { year: wordData.year };
        yearObject[mediaOutlet + wordDataset.word + 'rank'] = wordData.rank;
        yearObject[mediaOutlet + wordDataset.word + 'count'] = wordData.count;
        yearObject[mediaOutlet + wordDataset.word + 'freq'] = wordData.freq;
        yearObject[mediaOutlet + wordDataset.word + 'word'] = wordDataset.word;
        yearObject[mediaOutlet + wordDataset.word + 'mediaOutlet'] = mediaOutlet;
        yearObject[mediaOutlet + wordDataset.word + 'rel_freq'] =
          wordData.rel_freq;
        mediaOutletData.push(yearObject);
      });
      // Add the new result
      result.push({
        title: wordDataset.word + ' - ' + mediaOutlet,
        data: mediaOutletData,
      });
    }
  });
  return result;
}

function singleDataset(responseData) {
  let result = [];
  // The object that will contain all the data. This could be wrapped in brackets at
  // the final return and result could be removed but I think it is clearer and
  // consistant with the other functions when kept separate.
  let summaryObject = {
    title: 'Summary',
    data: [],
  };
  responseData.map(wordDataset => {
    for (const mediaOutlet in wordDataset.data) {
      wordDataset.data[mediaOutlet].map(wordData => {
        // Check if the year already exists in the summary object
        let yearObject = summaryObject.data.find(
          obj => obj.year === wordData.year,
        );
        // The year doesn't exist, set the year object to a new object for the year.
        if (!yearObject) {
          yearObject = { year: wordData.year };
          summaryObject.data.push(yearObject);
        }
        // Add to year object using, media source and word in the keys.
        yearObject[mediaOutlet + wordDataset.word + 'rank'] = wordData.rank;
        yearObject[mediaOutlet + wordDataset.word + 'count'] = wordData.count;
        yearObject[mediaOutlet + wordDataset.word + 'freq'] = wordData.freq;
        yearObject[mediaOutlet + wordDataset.word + 'word'] = wordDataset.word;
        yearObject[mediaOutlet + wordDataset.word + 'mediaOutlet'] = mediaOutlet;
        yearObject[mediaOutlet + wordDataset.word + 'rel_freq'] =
          wordData.rel_freq;
      });
    }
  });
  summaryObject.data.sort((x, y) => x.year - y.year);
  result.push(summaryObject);
  return result;
}

function byOutletDataset(responseData) {
  let result = [];
  responseData.map(wordDataset => {
    // Title and data to be appended to result
    let currentMediaOutlet = '';
    let mediaOutletData = [];
    for (const mediaOutlet in wordDataset.data) {
      let yearObject;
      mediaOutletData = [];
      currentMediaOutlet = mediaOutlet;

      wordDataset.data[mediaOutlet].map(wordData => {
        // Get a reference to the current media outlet data if it already exists.
        let mediaOutletInResult = result.find(obj => obj.title === mediaOutlet);
        if (mediaOutletInResult) {
          mediaOutletData = mediaOutletInResult.data;
        }
        // Get a reference to the year data in media outlet data if it already exists.
        yearObject = mediaOutletData.find(obj => obj.year === wordData.year);
        if (!yearObject) {
          yearObject = { year: wordData.year };
          mediaOutletData.push(yearObject);
        }
        // Creating keys for the data using using the media outlet and word.
        yearObject[mediaOutlet + wordDataset.word + 'rank'] = wordData.rank;
        yearObject[mediaOutlet + wordDataset.word + 'count'] = wordData.count;
        yearObject[mediaOutlet + wordDataset.word + 'freq'] = wordData.freq;
        yearObject[mediaOutlet + wordDataset.word + 'word'] = wordDataset.word;
        yearObject[mediaOutlet + wordDataset.word + 'mediaOutlet'] = mediaOutlet;
        yearObject[mediaOutlet + wordDataset.word + 'rel_freq'] =
          wordData.rel_freq;
      });

      // Check there is aready data for the particular year in the current media data.
      let yearDataObjectInMediaOutlet = mediaOutletData.find(
        obj => obj.year === yearObject.year,
      );
      // If there is no data already for the year, add the year object. If there was
      // already data, the year object would be a reference to an object within the
      // media outlet data array and wouldn't need to be appended.
      if (!yearDataObjectInMediaOutlet) {
        mediaOutletData.push(yearObject);
      }
      // Check if there is already data for the media outlet in result.
      let resultMediaOutlet = result.find(
        obj => obj.title === currentMediaOutlet,
      );
      // Similar to above. Only add to result if not already there, a reference has
      // been edited and doesn't need added again.
      if (!resultMediaOutlet) {
        let newResultMediaOutlet = {
          title: currentMediaOutlet,
          data: mediaOutletData,
        };
        result.push(newResultMediaOutlet);
      }
    }
  });
  return result;
}

module.exports = (function() {
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

      // Resutructure data based on chart type requested
      let processedData = {};
      switch (value.chartType) {
        case 'multiple':
          processedData = multipleDatasets(frequencyData);
          break;
        case 'single':
          processedData = singleDataset(frequencyData);
          break;
        case 'byOutlet':
          processedData = byOutletDataset(frequencyData);
          break;
        default:
          processedData = frequencyData;
      }

      // Set data in response to processedData.
      res.json({ data: processedData });
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
