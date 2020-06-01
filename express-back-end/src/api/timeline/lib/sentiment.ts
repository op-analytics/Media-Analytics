import SentimentData from '../interfaces/SentimentData';
import SentimentDocument from '../interfaces/SentimentDocument';
import Sentiment from '../models/sentiment.model';

function shapeData(dbData: SentimentDocument[]): SentimentData[] {
  const sentimentData: SentimentData[] = [];
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

async function GetSentiment(
  word: string,
  yearFrom: number,
  yearTo: number,
): Promise<SentimentData[]> {
  const sentimentDataDB = await Sentiment.find({
    word,
    year: { $gte: yearFrom, $lte: yearTo },
  }).exec();
  const sentimentData = shapeData(sentimentDataDB);
  sentimentData.map(sd => sd.data.sort((x, y) => x.year - y.year));
  return sentimentData;
}

export { GetSentiment };
