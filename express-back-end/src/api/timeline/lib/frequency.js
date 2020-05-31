const Frequency = require('../models/frequency.model');

function sortOnKey(objects, key) {
  objects.forEach(object => {
    object.data.sort((x, y) => x[key] - y[key]);
  });
}

function shapeData(dbData) {
  const frequencyData = [];
  dbData.forEach(frequencyDataObj => {
    const { word } = frequencyDataObj;
    const dataIndex = frequencyData.findIndex(fd => fd.word === word);
    const wordData = {
      year: frequencyDataObj.year,
      rank: frequencyDataObj.rank,
      count: frequencyDataObj.count,
      freq: frequencyDataObj.freq,
    };
    if (dataIndex === -1) {
      frequencyData.push({ word, data: [wordData] });
    } else {
      // If the word already exists in frequency data,
      // just append the current year's data.
      frequencyData[dataIndex].data.push(wordData);
    }
  });
  return frequencyData;
}

async function GetFrequency(words, yearFrom, yearTo) {
  const frequencyDataDB = await Frequency.find({
    word: words,
    year: { $gte: yearFrom, $lte: yearTo },
  });
  const frequencyData = shapeData(frequencyDataDB);

  sortOnKey(frequencyData, 'year');
  return frequencyData;
}

module.exports = {
  GetFrequency,
};
