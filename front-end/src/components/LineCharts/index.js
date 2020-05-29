import { makeStyles } from '@material-ui/core/styles';
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
  singleDataset,
  normaliseDatasets,
} from './utils';

const useStyles = makeStyles(() => ({
  chartContainer: {
    width: '100%',
    maxWidth: '60vw',
    height: '50vh',
    flex: '0 1 auto',
    paddingBottom: '6vh',
    paddingTop: '2rem',
  },
  chartTitle: {
    textAlign: 'center',
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
  tooltip: {
    margin: 0,
    lineHeight: '24px',
    border: '1px solid #f5f5f5',
    backgroundColor: 'hsla(0,0%,100%,.8)',
    padding: '10px',
  },
  tooltipLabel: {
    color: '#333',
  },
  tooltipLabelFirstWord: {
    color: '#777',
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
  gridItemChart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

/**
 * LineCharts A helper component for rendering multiple linecharts
 *
 * @component
 */
function LineCharts({ datasets, formParameters, mediaOutlets }) {
  const classes = useStyles();

  const words = formParameters.words;
  const outlets = formParameters.outlets;
  const yearFrom = formParameters.yearFrom;
  const yearTo = formParameters.yearTo;
  const yAxisKey = formParameters.yAxisKey;
  const displayNormalised = formParameters.displayNormalised;
  const displayOption = formParameters.displayOption;

  // //TODO try merging this into the if below.
  let normalisedDatasets = normaliseDatasets(datasets, words, outlets, yearFrom, yearTo, yAxisKey)
  console.log('normalisedDatasets :>> ', normalisedDatasets);
  if (displayNormalised) {
    datasets = normalisedDatasets;
  }

  //TODO Do legend and tooltip here aswell.
  let processedData = {};
  switch (displayOption) {
    case 'multiple':
      processedData = multipleDatasets(datasets, mediaOutlets);
      return (
        <LinechartMultiple
          datasets={processedData}
          formParameters={formParameters}
          mediaOutlets={mediaOutlets}
          classes={classes}
        />
      );
    case 'single':
      processedData = singleDataset(datasets);
      return (
        <LinechartSingle
          dataset={processedData}
          formParameters={formParameters}
          mediaOutlets={mediaOutlets}
          classes={classes}
        />
      );
    case 'byOutlet':
      processedData = byOutletDataset(datasets, mediaOutlets);
      return (
        <LinechartByOutlet
          datasets={processedData}
          formParameters={formParameters}
          mediaOutlets={mediaOutlets}
          classes={classes}
        />
      );
    case 'byWord':
      processedData = byWordDataset(datasets);
      return (
        <LinechartByWord
          datasets={processedData}
          formParameters={formParameters}
          mediaOutlets={mediaOutlets}
          classes={classes}
        />
      );
    default:
      processedData = multipleDatasets(datasets, mediaOutlets);
      return (
        <LinechartMultiple
          datasets={processedData}
          formParameters={formParameters}
          mediaOutlets={mediaOutlets}
          classes={classes}
        />
      );
  }
}

LineCharts.propTypes = {
  /** The datasets to render line charts for */
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      data: PropTypes.shape({}.isRequired).isRequired,
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
