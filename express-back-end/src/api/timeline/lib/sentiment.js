const Sentiment = require('../models/sentiment.model');

function sortOnKey(objects, key) {
  objects.forEach(object => {
    object.data.sort((x, y) => x[key] - y[key]);
  });
}

function shapeData(dbData) {
  const sentimentData = [];
  dbData.forEach(sentimentDataObj => {
    const { word } = sentimentDataObj;
    const dataIndex = sentimentData.findIndex(sd => sd.word === word);
    const wordData = {
      year: sentimentDataObj.year,
      sentiment: sentimentDataObj.sentiment,
    };
    if (dataIndex === -1) {
      sentimentData.push({ word, data: [wordData] });
    } else {
      // If the word already exists in sentiment data,
      // just append the current year's data.
      sentimentData[dataIndex].data.push(wordData);
    }
  });
  return sentimentData;
}

async function GetSentiment(word, yearFrom, yearTo) {
  const sentimentDataDB = await Sentiment.find({
    word: word,
    year: { $gte: yearFrom, $lte: yearTo },
  }).exec();
  console.log('sentimentDataDB :>> ', sentimentDataDB);
  const sentimentData = shapeData(sentimentDataDB);
  sortOnKey(sentimentData, 'year');
  return sentimentData;
}

module.exports = {
  GetSentiment,
};
