import Grid from '@material-ui/core/Grid';
import PropTypes, { arrayOf, number,shape, string } from 'prop-types';
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useSharedStyles } from './hooks/useStyles';
import { createTooltip, CustomizedDot, stringToColour } from './utils';

// FIXME: This component should only receive a list of datasets to diplay, A
// tooltip and a legend
function LinechartMultiple({ datasets, formParameters, mediaOutlets }) {
  const sharedClasses = useSharedStyles();
  // FIXME: destructure all of this at once
  const { words } = formParameters;
  const { outlets } = formParameters;
  const { yearFrom } = formParameters;
  const { yearTo } = formParameters;
  const { yAxisKey } = formParameters;
  const { displayNormalised } = formParameters;
  const { displayOption } = formParameters;

  return (
    <Grid container spacing={1} justify="center">
      {words.map(word => (
        <Grid key={word} item container xs={12} spacing={2} justify="center">
          {outlets.map(outlet => {
            const data = datasets.find(obj =>
              obj.data.find(
                objData => objData.word === word && objData.outlet === outlet,
              ),
            );

            if (data) {
              return (
                <Grid
                  key={word + outlet}
                  item
                  lg={12 / outlets.length}
                  xs={12}
                  className={sharedClasses.gridItemChart}
                >
                  <div className={sharedClasses.chartContainer} key={data.title}>
                    <h3 className={sharedClasses.chartTitle}>{data.title}</h3>
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
                          dataKey="year"
                          tickCount={Math.abs(yearTo - yearFrom)}
                          allowDataOverflow // Forces displayed data to match domain.
                        />
                        <YAxis
                          domain={displayNormalised ? [0, 1] : ['auto', 'auto']}
                          width={75}
                          allowDataOverflow // Forces displayed data to match domain.
                        />
                        <Tooltip
                          itemSorter={item1 => item1.value * -1}
                          content={createTooltip(
                            sharedClasses,
                            words,
                            outlets,
                            displayOption,
                            yAxisKey,
                            mediaOutlets,
                            datasets,
                          )}
                        />
                        {words.map(lineWord => {
                          return outlets.map(lineOutlet => (
                            <Line
                              key={lineWord + lineOutlet}
                              type="monotone"
                              dataKey={lineOutlet + lineWord + yAxisKey}
                              stroke={stringToColour(lineWord)}
                              fill={stringToColour(lineWord)}
                              connectNulls
                              strokeWidth={3}
                              dot={<CustomizedDot number={0} />}
                              activeDot={{
                                stroke: stringToColour(lineWord),
                                strokeWidth: 7,
                                border: 'white',
                              }}
                            />
                          ));
                        })}
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

LinechartMultiple.propTypes = {
  datasets: arrayOf(
    shape({
      title: string.isRequired,
      data: arrayOf(
        shape({
          word: string.isRequired,
          outlet: string.isRequired,
          year: string.isRequired,
          outletWordRank: number,
          outletWordCount: number,
          outletWordFreq: number,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  ).isRequired,
  formParameters: shape({
    words: arrayOf(string).isRequired,
    outlets: arrayOf(string).isRequired,
    yearFrom: number.isRequired,
    yearTo: number.isRequired,
    yAxisKey: string.isRequired,
    displayNormalised: PropTypes.bool.isRequired,
    displayOption: string.isRequired,
  }).isRequired,
  mediaOutlets: arrayOf(
    shape({
      title: string.isRequired,
      value: string.isRequired,
    }),
  ).isRequired,
};

export default LinechartMultiple;
