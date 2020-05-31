const Frequency = require('../lib/frequency');

exports.getData = async (req, res) => {
  const { words: dirtyWords, year_from: yearFrom, year_to: yearTo } = req.body;
  const words = dirtyWords.map(word => word.trim().toLowerCase());

  const frequencyData = await Frequency.GetFrequency(words, yearFrom, yearTo);

  if (frequencyData.length > 0) return res.json({ data: frequencyData });

  return res.status(404).json({
    error: 'No frequency data was found for given parameters',
  });
};

