import SentimentData from '../interfaces/SentimentData';
import SentimentDocument from '../interfaces/SentimentDocument';
import Sentiment from '../models/sentiment.model';

/**
 * Shape the data from the database into sentiment data objects
 * @param dbData - The data from the database to shape
 * @returns The sentiment data for the database data
 */
function shapeData(dbData: SentimentDocument[]): SentimentData[] {
  const sentimentData: SentimentData[] = [];
  dbData.forEach(sentimentDataObj => {
    const { word } = sentimentDataObj;
    // Get the index of the current word in the new sentiment data array
    const dataIndex = sentimentData.findIndex(sd => sd.word === word);
    const wordData = {
      year: sentimentDataObj.year,
      sentiment: sentimentDataObj.sentiment,
    };

    // Create an entry for a new word in sentiment data if the index was not found
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

/**
 * Get sentiment data from the database for a given set of parameters
 * @param words - The words to include in your search
 * @param yearFrom - The year to start your search from
 * @param yearTo - The year to end your search at
 * @returns The sentiment data for the given parameters
 */
async function GetSentiment(
  word: string,
  yearFrom: number,
  yearTo: number,
): Promise<SentimentData[]> {
  // Query for the data from the database that matches the arguments given
  const sentimentDataDB = await Sentiment.find({
    word,
    year: { $gte: yearFrom, $lte: yearTo },
  }).exec();

  // Reshape the data from the database
  const sentimentData = shapeData(sentimentDataDB);

  // Sort the data by year
  sentimentData.map(sd => sd.data.sort((x, y) => x.year - y.year));
  return sentimentData;
}

export { GetSentiment };
