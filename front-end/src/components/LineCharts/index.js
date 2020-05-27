import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { CSVLink } from 'react-csv';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  byOutletDataset,
  byWordDataset,
  createLegendPayload,
  createTooltip,
  CustomizedDot,
  multipleDatasets,
  singleDataset,
  stringToColour,
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
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
  },
}));

/**
 * LineCharts A helper component for rendering multiple linecharts
 *
 * @component
 */
function LineCharts({
  datasets,
  xAxisKey,
  yAxisKey,
  displayNormalised,
  words,
  outlets,
  mediaOutlets,
  yearFrom,
  yearTo,
  displayOption,
}) {
  const classes = useStyles();
  const displayed = [];
  let processedData = {};

  let normalisedDatasets = JSON.parse(JSON.stringify(datasets));
  Object.values(normalisedDatasets).forEach(wordData => {
    Object.values(wordData.data).forEach(outletData => {
      let firstYearData = outletData.find(obj => obj.year === String(yearFrom));
      if (!firstYearData) {
        firstYearData = Object.values(outletData)[0];
      }
      let min = firstYearData[yAxisKey];
      let max = firstYearData[yAxisKey];
      Object.values(outletData).forEach(yearData => {
        if (yearData.year >= yearFrom && yearData.year <= yearTo) {
          if (yearData[yAxisKey] > max) max = yearData[yAxisKey];
          if (yearData[yAxisKey] < min) min = yearData[yAxisKey];
        }
      });
      Object.values(outletData).forEach(yearData => {
        yearData[yAxisKey] = (yearData[yAxisKey] - min) / (max - min);
      });
    });
  });

  if (displayNormalised) {
    datasets = normalisedDatasets;
  }

  switch (displayOption) {
    case 'multiple':
      processedData = multipleDatasets(datasets, mediaOutlets);
      break;
    case 'single':
      processedData = singleDataset(datasets);
      break;
    case 'byOutlet':
      processedData = byOutletDataset(datasets, mediaOutlets);
      break;
    case 'byWord':
      processedData = byWordDataset(datasets);
      break;
    default:
      processedData = datasets;
  }

  console.log('processedData :>> ', processedData);

  return (
    <Grid container spacing={1} justify="center">
      {words.map(word => (
        <Grid key={word} item container xs={12} spacing={2} justify="center">
          {outlets.map(outlet => {
            const data = processedData.find(obj =>
              obj.data.find(objData =>
                Object.keys(objData).find(key =>
                  key.includes(outlet + word),
                ),
              ),
            );

            if (data && !displayed.includes(data.title)) {
              displayed.push(data.title);
              return (
                <Grid
                  key={word + outlet}
                  item
                  lg={
                    displayOption === 'multiple' ? 12 / outlets.length : 12
                  }
                  xs={12}
                  className={classes.gridItemChart}
                >
                  <div className={classes.chartContainer} key={data.title}>
                    <h3 className={classes.chartTitle}>{data.title}</h3>
                    <ResponsiveContainer>
                      <LineChart
                        data={data.data}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          domain={[yearFrom, yearTo]}
                          dataKey={xAxisKey}
                          tickCount={Math.abs(yearTo - yearFrom)}
                          allowDataOverflow={true} // Forces displayed data to match domain.
                        />
                        <YAxis
                          domain={displayNormalised ? [0, 1] : ['auto', 'auto']}
                          width={75}
                          allowDataOverflow={true} // Forces displayed data to match domain.
                        />
                        <Legend
                          payload={createLegendPayload(
                            data.data,
                            words,
                            outlets,
                            yAxisKey,
                            mediaOutlets,
                            displayOption,
                          )}
                        />
                        <Tooltip
                          itemSorter={item1 => item1.value * -1}
                          content={createTooltip(
                            classes,
                            words,
                            outlets,
                            displayOption,
                            yAxisKey,
                            mediaOutlets,
                          )}
                        />

                        {words.map(lineWord =>
                          outlets.map((lineMediaOutlet, index) => {
                            return (
                              <Line
                                key={lineMediaOutlet + lineWord}
                                type="monotone"
                                name={`${
                                  mediaOutlets.find(
                                    obj => obj.value === lineMediaOutlet,
                                  ).title
                                } - ${lineWord}`}
                                dataKey={lineMediaOutlet + lineWord + yAxisKey}
                                stroke={
                                  displayOption === 'byWord'
                                    ? stringToColour(lineMediaOutlet)
                                    : stringToColour(lineWord)
                                }
                                fill={
                                  displayOption === 'byWord'
                                    ? stringToColour(lineMediaOutlet)
                                    : stringToColour(lineWord)
                                }
                                connectNulls
                                strokeWidth={3}
                                dot={
                                  <CustomizedDot
                                    number={
                                      displayOption === 'byWord' ? 0 : index
                                    }
                                  />
                                }
                                activeDot={{
                                  stroke:
                                    displayOption === 'byWord'
                                      ? stringToColour(lineMediaOutlet)
                                      : stringToColour(lineWord),
                                  strokeWidth: 7,
                                  border: 'white',
                                }}
                              />
                            );
                          }),
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <Box display="flex" justifyContent="center">
                    <CSVLink
                      data={data.data}
                      filename={`${data.title}-word-freq.csv`}
                    >
                      Download as CSV
                    </CSVLink>
                  </Box>
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      ))}
    </Grid>
  );
}

LineCharts.defaultProps = {
  xAxisKey: 'X',
};

LineCharts.propTypes = {
  /** The datasets to render line charts for */
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      data: PropTypes.shape({}.isRequired).isRequired,
    }),
  ).isRequired,
  /** The key for the x axis of the datasets */
  xAxisKey: PropTypes.string,
  /** The key for the y axis of the datasets */
  yAxisKey: PropTypes.string.isRequired,
  displayNormalised: PropTypes.bool.isRequired,
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  outlets: PropTypes.arrayOf(PropTypes.string).isRequired,
  mediaOutlets: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  yearFrom: PropTypes.number.isRequired,
  yearTo: PropTypes.number.isRequired,
  displayOption: PropTypes.string.isRequired,
};

export default LineCharts;
