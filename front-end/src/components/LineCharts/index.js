import Grid from '@material-ui/core/Grid';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
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
  displayAbsolute,
  words,
  mediaOutlets,
  allMediaOutlets,
  yearFrom,
  yearTo,
  displayOption,
}) {
  const classes = useStyles();
  const displayed = [];
  let processedData = {};
  let displayAbsoluteLargestValue = 0;

  switch (displayOption) {
    case 'multiple':
      processedData = multipleDatasets(datasets, allMediaOutlets);
      break;
    case 'single':
      processedData = singleDataset(datasets);
      break;
    case 'byOutlet':
      processedData = byOutletDataset(datasets, allMediaOutlets);
      break;
    case 'byWord':
      processedData = byWordDataset(datasets);
      break;
    default:
      processedData = datasets;
  }
  if (displayAbsolute) {
    words.forEach(word => {
      mediaOutlets.forEach(mediaOutlet => {
        const data = processedData.find(obj =>
          obj.data.find(objData =>
            Object.keys(objData).find(key => key.includes(mediaOutlet + word)),
          ),
        );
        if (data) {
          data.data.forEach(dataObj => {
            const currentData = dataObj[mediaOutlet + word + yAxisKey];
            if (currentData > displayAbsoluteLargestValue) {
              displayAbsoluteLargestValue = currentData;
            }
          });
        }
      });
    });
  }

  return (
    <Grid container spacing={1} justify="center">
      {words.map(word => (
        <Grid key={word} item container xs={12} spacing={2} justify="center">
          {mediaOutlets.map(mediaOutlet => {
            const data = processedData.find(obj =>
              obj.data.find(objData =>
                Object.keys(objData).find(key =>
                  key.includes(mediaOutlet + word),
                ),
              ),
            );

            if (data && !displayed.includes(data.title)) {
              displayed.push(data.title);
              return (
                <Grid
                  key={word + mediaOutlet}
                  item
                  xs={
                    displayOption === 'multiple' ? 12 / mediaOutlets.length : 12
                  }
                >
                  <div className={classes.chartContainer} key={data.title}>
                    <h3 className={classes.chartTitle}>{data.title}</h3>
                    <ResponsiveContainer>
                      <LineChart
                        className={classes.chart}
                        data={data.data}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
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
                          domain={
                            displayAbsolute
                              ? [0, displayAbsoluteLargestValue]
                              : ['auto', 'auto']
                          }
                        />
                        <Legend
                          payload={createLegendPayload(
                            data,
                            words,
                            mediaOutlets,
                            yAxisKey,
                            allMediaOutlets,
                            displayOption,
                          )}
                        />
                        <Tooltip
                          itemSorter={item1 => item1.value * -1}
                          content={createTooltip(
                            classes,
                            words,
                            mediaOutlets,
                            displayOption,
                            yAxisKey,
                            allMediaOutlets,
                          )}
                        />

                        {words.map(lineWord =>
                          mediaOutlets.map((lineMediaOutlet, index) => {
                            return (
                              <Line
                                key={lineMediaOutlet + lineWord}
                                type="monotone"
                                name={`${
                                  allMediaOutlets.find(
                                    obj => obj.value === lineMediaOutlet,
                                  ).name
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
      title: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    }),
  ).isRequired,
  /** The key for the x axis of the datasets */
  xAxisKey: PropTypes.string,
  /** The key for the y axis of the datasets */
  yAxisKey: PropTypes.string.isRequired,
  displayAbsolute: PropTypes.bool.isRequired,
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  mediaOutlets: PropTypes.arrayOf(PropTypes.string).isRequired,
  allMediaOutlets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  yearFrom: PropTypes.number.isRequired,
  yearTo: PropTypes.number.isRequired,
  displayOption: PropTypes.string.isRequired,
};

export default LineCharts;