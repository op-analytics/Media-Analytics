import Frequency from '../models/frequency.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortOnKey(objects: { data: Record<string, any> }[], key: string): void {
  objects.forEach(object => {
    object.data.sort(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (x: Record<string, any>, y: Record<string, any>) => x[key] - y[key],
    );
  });
}

function shapeData(
  dbData: {
    year: number;
    rank: number;
    count: number;
    freq: number;
    word: string;
  }[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const frequencyData: {
    word: string;
    data: {
      year: number;
      rank: number;
      count: number;
      freq: number;
    }[];
  }[] = [];
  dbData.forEach(
    (frequencyDataObj: {
      year: number;
      rank: number;
      count: number;
      freq: number;
      word: string;
    }) => {
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
    },
  );
  return frequencyData;
}

async function GetFrequency(
  words: string[],
  yearFrom: number,
  yearTo: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  // TODO: Check if there is a better way to do this
  const frequencyDataDB = ((await Frequency.find({
    word: words,
    year: { $gte: yearFrom, $lte: yearTo },
  }).exec()) as unknown) as {
    year: number;
    rank: number;
    count: number;
    freq: number;
    word: string;
  }[];
  const frequencyData = shapeData(frequencyDataDB);

  sortOnKey(frequencyData, 'year');
  return frequencyData;
}

export { GetFrequency };
