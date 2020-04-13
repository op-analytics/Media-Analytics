import axios from 'axios';
import { call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  getAssociationFailure,
  getAssociationSuccess,
  getFrequencyFailure,
  getFrequencySuccess,
  GET_ASSOCIATION,
  GET_FREQUENCY,
} from '.';

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : process.env.REACT_APP_API_URL;

function multipleDatasets(responseData) {
  let result = [];
  responseData.map(wordDataset => {
    for (const mediaOutlet in wordDataset.data) {
      let mediaOutletData = [];
      wordDataset.data[mediaOutlet].map(wordData => {
        // Creating keys for the year data using using the media outlet and word.
        let yearDataObject = { year: wordData.year };
        yearDataObject[mediaOutlet + wordDataset.word + 'rank'] = wordData.rank;
        yearDataObject[mediaOutlet + wordDataset.word + 'count'] =
          wordData.count;
        yearDataObject[mediaOutlet + wordDataset.word + 'freq'] = wordData.freq;
        mediaOutletData.push(yearDataObject);
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
  // The objec that will contain all the data. This could be wrapped in brackets at
  // the final return and result could be removed but I think it is clearer and
  // consistant with the other functions to keep separate.
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
      });
    }
  });
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
      let yearDataObject;
      mediaOutletData = [];
      currentMediaOutlet = mediaOutlet;

      wordDataset.data[mediaOutlet].map(wordData => {
        // Get a reference to the current media outlet data if it already exists.
        let mediaOutletInResult = result.find(obj => obj.title === mediaOutlet);
        if (mediaOutletInResult) {
          mediaOutletData = mediaOutletInResult.data;
        }
        // Get a reference to the year data in media outlet data if it already exists.
        yearDataObject = mediaOutletData.find(obj => obj.year === wordData.year);
        if (!yearDataObject) {
          yearDataObject = { year: wordData.year };
          mediaOutletData.push(yearDataObject);
        }
        // Creating keys for the data using using the media outlet and word.
        yearDataObject[mediaOutlet + wordDataset.word + 'rank'] = wordData.rank;
        yearDataObject[mediaOutlet + wordDataset.word + 'count'] =
          wordData.count;
        yearDataObject[mediaOutlet + wordDataset.word + 'freq'] = wordData.freq;
      });

      // Check there is aready data for the particular year in the current media data.
      let yearDataObjectInMediaOutlet = mediaOutletData.find(
        obj => obj.year === yearDataObject.year,
      );
      // If there is no data already for the year, add the year object. If there was
      // already data, the year object would be a reference to an object within the
      // media outlet data array and wouldn't need to be appended.
      if (!yearDataObjectInMediaOutlet) {
        mediaOutletData.push(yearDataObject);
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

function* fetchFrequencies(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_URL}/timeline/frequency`,
      action.payload,
    );
    let processedResponse = {};
    switch (action.chartType) {
      case 'multiple':
        processedResponse = multipleDatasets(response.data.data);
        break;
      case 'single':
        processedResponse = singleDataset(response.data.data);
        break;
      case 'byOutlet':
        processedResponse = byOutletDataset(response.data.data);
        break;
    }
    yield put(getFrequencySuccess(processedResponse));
  } catch (err) {
    yield put(getFrequencyFailure(err));
  }
}

function* fetchAssociations(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_URL}/timeline/latent-association`,
      action.payload,
    );
    yield put(getAssociationSuccess(response.data.data));
  } catch (err) {
    yield put(getAssociationFailure(err));
  }
}

function* watchGetFrequencies() {
  yield takeEvery(GET_FREQUENCY, fetchFrequencies);
}

function* watchGetAssociations() {
  yield takeEvery(GET_ASSOCIATION, fetchAssociations);
}

export default [fork(watchGetFrequencies), fork(watchGetAssociations)];
