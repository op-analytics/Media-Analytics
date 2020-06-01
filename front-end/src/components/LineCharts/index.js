import PropTypes from 'prop-types';
import React from 'react';
import LinechartByOutlet from './linechart-by-outlet';
import LinechartByWord from './linechart-by-word';
import LinechartMultiple from './linechart-multiple';
import LinechartSingle from './linechart-single';
import {
  byOutletDataset,
  byWordDataset,
  multipleDatasets,
  normaliseDatasets,
  singleDataset
} from './utils';



/**
 * LineCharts A helper component for rendering multiple linecharts
 *
 * @component
 */
function LineCharts({ datasets, formParameters, mediaOutlets }) {
  const {words, outlets, yearFrom, yearTo, yAxisKey, displayNormalised, displayOption} = formParameters;

  const normalisedDatasets = normaliseDatasets(datasets, words, outlets, yearFrom, yearTo, yAxisKey);

  let dataSource = datasets

  if (displayNormalised) {
    dataSource = normalisedDatasets;
  }

  let processedData = {};
  switch (displayOption) {
    case 'multiple':
      processedData = multipleDatasets(dataSource, mediaOutlets);
      return (
        <LinechartMultiple
          datasets={processedData}
          formParameters={formParameters}
          mediaOutlets={mediaOutlets}
        />
      );
    case 'single':
      processedData = singleDataset(dataSource);
      return (
        <LinechartSingle
          dataset={processedData}
          formParameters={formParameters}
          mediaOutlets={mediaOutlets}
        />
      );
    case 'byOutlet':
      processedData = byOutletDataset(dataSource, mediaOutlets);
      return (
        <LinechartByOutlet
          datasets={processedData}
          formParameters={formParameters}
          mediaOutlets={mediaOutlets}
        />
      );
    case 'byWord':
      processedData = byWordDataset(dataSource);
      return (
        <LinechartByWord
          datasets={processedData}
          formParameters={formParameters}
          mediaOutlets={mediaOutlets}
        />
      );
    default:
      processedData = multipleDatasets(dataSource, mediaOutlets);
      return (
        <LinechartMultiple
          datasets={processedData}
          formParameters={formParameters}
          mediaOutlets={mediaOutlets}
        />
      );
  }
};

LineCharts.propTypes = {
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      outlet: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      freq: PropTypes.number.isRequired,
    }),
  ).isRequired,
  formParameters: PropTypes.shape({
    words: PropTypes.arrayOf(PropTypes.string).isRequired,
    outlets: PropTypes.arrayOf(PropTypes.string).isRequired,
    yearFrom: PropTypes.number.isRequired,
    yearTo: PropTypes.number.isRequired,
    yAxisKey: PropTypes.string.isRequired,
    displayNormalised: PropTypes.bool.isRequired,
    displayOption: PropTypes.string.isRequired,
  }).isRequired,
  mediaOutlets: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default LineCharts;
