const Sentiment = require('../lib/sentiment');

exports.getData = async (req, res) => {
  const { word: dirtyWord, year_from: yearFrom, year_to: yearTo } = req.body;
  const word = dirtyWord.trim().toLowerCase();
  const sentimentData = await Sentiment.GetSentiment(word, yearFrom, yearTo);
  if (sentimentData.length > 0) return res.json({ data: sentimentData });

  return res.status(404).json({
    error: 'No sentiment data was found for given parameters',
  });
};
