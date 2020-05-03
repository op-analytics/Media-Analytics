import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import { createLegendPayload, stringToColour, CustomizedDot } from './utils';

const useStyles = makeStyles(() => ({
  chartContainer: {
    width: '80vw',
    height: '50vh',
    flex: '0 1 auto',
    maxWidth: '1000px',
    paddingBottom: '6vh',
  },
  chartContainerInGrid: {
    width: '100%',
    height: '50vh',
    flex: '0 1 auto',
    //maxWidth: '1000px',
    paddingBottom: '10vh',
  },
  chartTitle: {
    textAlign: 'center',
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
  tooltip: {
    width: '200px',
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
  let displayed = [];
  return (
    <Grid container spacing={1} justify="center">
      {words.map(word => (
        <Grid key={word} item container xs={12} spacing={2} justify="center">
          {mediaOutlets.map(mediaOutlet => {
            {
              let data = datasets.find(obj =>
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
                      displayOption === 'multiple'
                        ? 12 / mediaOutlets.length
                        : 12
                    }
                  >
                    <div
                      className={classes.chartContainerInGrid}
                      key={data.title}
                    >
                      <h1 className={classes.chartTitle}>{data.title}</h1>
                      <ResponsiveContainer>
                        <LineChart
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
                          />
                          <YAxis
                            domain={[displayAbsolute ? 0 : 'auto', 'auto']}
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

                          {words.map(line_word =>
                            mediaOutlets.map((line_mediaOutlet, index) => {
                              return (
                                <Line
                                  key={line_mediaOutlet + line_word}
                                  type="monotone"
                                  name={
                                    allMediaOutlets.find(
                                      obj => obj.value === line_mediaOutlet,
                                    ).name +
                                    ' - ' +
                                    line_word
                                  }
                                  dataKey={
                                    line_mediaOutlet + line_word + yAxisKey
                                  }
                                  stroke={
                                    displayOption === 'byWord'
                                      ? stringToColour(line_mediaOutlet)
                                      : stringToColour(line_word)
                                  }
                                  fill={
                                    displayOption === 'byWord'
                                      ? stringToColour(line_mediaOutlet)
                                      : stringToColour(line_word)
                                  }
                                  connectNulls
                                  strokeWidth={3}
                                  dot={(
                                    <CustomizedDot
                                      number={
                                        displayOption === 'byWord' ? 0 : index
                                      }
                                    />
                                  )}
                                  activeDot={{
                                    stroke:
                                      displayOption === 'byWord'
                                        ? stringToColour(line_mediaOutlet)
                                        : stringToColour(line_word),
                                    strokeWidth: 7,
                                    border: 'white',
                                  }}
                                />
                              );
                            }),
                          )}
                          <Tooltip />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Grid>
                );
              }
            }
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
