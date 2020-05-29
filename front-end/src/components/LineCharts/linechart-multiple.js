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
  normaliseDatasets,
} from './utils';

function LinechartMultiple({ datasets, formParameters, mediaOutlets, classes }) {
  const displayed = [];

  const words = formParameters.words;
  const outlets = formParameters.outlets;
  const yearFrom = formParameters.yearFrom;
  const yearTo = formParameters.yearTo;
  const yAxisKey = formParameters.yAxisKey;
  const displayNormalised = formParameters.displayNormalised;
  const displayOption = formParameters.displayOption;

  return (
    <Grid container spacing={1} justify="center">
      {words.map(word => (
        <Grid key={word} item container xs={12} spacing={2} justify="center">
          {outlets.map(outlet => {
            const data = datasets.find(obj =>
              obj.data.find(objData =>
                Object.keys(objData).find(key => key.includes(outlet + word)),
              ),
            );

            if (data && !displayed.includes(data.title)) {
              displayed.push(data.title);
              return (
                <Grid
                  key={word + outlet}
                  item
                  lg={displayOption === 'multiple' ? 12 / outlets.length : 12}
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
                          dataKey={'year'}
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
    </Grid>)
}

export default LinechartMultiple;
