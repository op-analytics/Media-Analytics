import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { createTooltip } from './utils';

const useStyles = makeStyles(() => ({
  chartContainer: {
    width: '80vw',
    height: '50vh',
    flex: '0 1 auto',
    maxWidth: '1000px',
    paddingBottom: '6vh',
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

function LineCharts({ datasets, xAxisKey, yAxisKey, tooltipItems }) {
  const classes = useStyles();

  return (
    <>
      {datasets.map(data => (
        <div className={classes.chartContainer} key={data.title}>
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
              //key={data.word}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip content={createTooltip(classes, tooltipItems)} />
              <Line
                type="monotone"
                dataKey={yAxisKey}
                stroke="#8884d8"
                fill="#8884d8"
                strokeWidth={3}
                dot={{ strokeWidth: 5 }}
                activeDot={{
                  stroke: '#3F51B5',
                  strokeWidth: 7,
                  border: 'white',
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </>
  );
}

LineCharts.propTypes = {
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    }),
  ).isRequired,
  xAxisKey: PropTypes.string,
  yAxisKey: PropTypes.string.isRequired,
  tooltipItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default LineCharts;
