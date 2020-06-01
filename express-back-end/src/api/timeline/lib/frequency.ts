import FrequencyData from '../interfaces/FrequencyData';
import FrequencyDocument from '../interfaces/FrequencyDocument';
import Frequency from '../models/frequency.model';

function shapeData(dbData: FrequencyDocument[]): FrequencyData[] {
  const frequencyData: FrequencyData[] = [];
  dbData.forEach((frequencyDataObj: FrequencyDocument) => {
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

async function GetFrequency(
  words: string[],
  yearFrom: number,
  yearTo: number,
): Promise<FrequencyData[]> {
  const frequencyDataDB = await Frequency.find({
    word: { $in: words },
    year: { $gte: yearFrom, $lte: yearTo },
  }).exec();

  const frequencyData = shapeData(frequencyDataDB);
  frequencyData.map(fd => fd.data.sort((x, y) => x.year - y.year));
  return frequencyData;
}

export { GetFrequency };
