import Grid from '@material-ui/core/Grid';
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
  createLegendPayload,
  createTooltip,
  CustomizedDot,
  stringToColour,
} from './utils';

function LinechartByWord({ datasets, formParameters, mediaOutlets, classes }) {
  const words = formParameters.words;
  const outlets = formParameters.outlets;
  const yearFrom = formParameters.yearFrom;
  const yearTo = formParameters.yearTo;
  const yAxisKey = formParameters.yAxisKey;
  const displayNormalised = formParameters.displayNormalised;
  const displayOption = formParameters.displayOption;

  return (
    <Grid key={'container'} item container xs={12} spacing={2} justify="center">
      {datasets.map(dataset => (
        <Grid
          key={dataset.title}
          item
          lg={12}
          xs={12}
          className={classes.gridItemChart}
        >
          <div className={classes.chartContainer} key={dataset.title}>
            <h3 className={classes.chartTitle}>{dataset.title}</h3>
            <ResponsiveContainer>
              <LineChart
                data={dataset.data}
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
                    dataset.data,
                    words,
                    outlets,
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
                    datasets
                  )}
                />

                {outlets.map((outlet) => {
                  return (
                    <Line
                      key={outlet}
                      type="monotone"
                      dataKey={outlet + yAxisKey}
                      stroke={stringToColour(outlet)}
                      fill={stringToColour(outlet)}
                      connectNulls
                      strokeWidth={3}
                      dot={<CustomizedDot number={0} />}
                      activeDot={{
                        stroke: stringToColour(outlet),
                        strokeWidth: 7,
                        border: 'white',
                      }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default LinechartByWord;
