// Actions
export const GET_FREQUENCY = 'timeline/GET_FREQUENCY';
const GET_FREQUENCY_FAILURE = 'timeline/GET_FREQUENCY_FAILURE';
const GET_FREQUENCY_SUCCESS = 'timeline/GET_FREQUENCY_SUCCESS';

export const GET_ASSOCIATION = 'timeline/GET_ASSOCIATION';
const GET_ASSOCIATION_FAILURE = 'timeline/GET_ASSOCIATION_FAILURE';
const GET_ASSOCIATION_SUCCESS = 'timeline/GET_ASSOCIATION_SUCCESS';

const initialState = {
  frequencies: [],
  associations: null,
  loading: false,
  error: null,
};
// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_FREQUENCY:
      return {
        ...state,
        loading: true,
      };
    case GET_FREQUENCY_SUCCESS:
      return {
        ...state,
        frequencies: action.payload,
        loading: false,
      };
    case GET_FREQUENCY_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_ASSOCIATION:
      return {
        ...state,
        loading: true,
      };
    case GET_ASSOCIATION_SUCCESS:
      return {
        ...state,
        associations: action.payload,
        loading: false,
      };
    case GET_ASSOCIATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

// Action Creators
export const getFrequencies = (
  words,
  yearFrom,
  yearTo,
  mediaOutlets,
  chartType,
) => ({
  type: GET_FREQUENCY,
  payload: {
    words,
    year_from: yearFrom,
    year_to: yearTo,
    media_outlets: mediaOutlets,
    chartType: chartType,
  },
});

export const getFrequencySuccess = frequencies => ({
  type: GET_FREQUENCY_SUCCESS,
  payload: frequencies,
});

export const getFrequencyFailure = error => ({
  type: GET_FREQUENCY_FAILURE,
  payload: error,
});

export const getAssociations = (
  concept1,
  concept2,
  yearFrom,
  yearTo,
  mediaOutlets,
) => ({
  type: GET_ASSOCIATION,
  payload: {
    concept_1: concept1,
    concept_2: concept2,
    year_from: yearFrom,
    year_to: yearTo,
    media_outlets: mediaOutlets,
  },
});

export const getAssociationSuccess = associations => ({
  type: GET_ASSOCIATION_SUCCESS,
  payload: associations,
});

export const getAssociationFailure = error => ({
  type: GET_ASSOCIATION_FAILURE,
  payload: error,
});
