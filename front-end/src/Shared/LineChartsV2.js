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
  customTooltip: {
    width: '200px',
    margin: 0,
    lineHeight: '24px',
    border: '1px solid #f5f5f5',
    backgroundColor: 'hsla(0,0%,100%,.8)',
    padding: '10px',
  },
  customTooltipLabel: {
    color: '#333',
  },
  customTooltipLabelSpan: {
    color: '#777',
  },
}));

const CustomTooltip = ({ active, payload, label, classes }) => {
  if (active) {
    return (
      <div className={classes.customTooltip}>
        <p className={classes.customTooltipLabel}>
          <span className={classes.customTooltipLabelSpan}>Year:</span>
          {` ${payload[0].payload.year}`}
        </p>
        <p className={classes.customTooltipLabel}>
          <span className={classes.customTooltipLabelSpan}>Freq:</span>
          {` ${payload[0].payload.freq.toFixed(5)}`}
        </p>
        <p className={classes.customTooltipLabel}>
          <span className={classes.customTooltipLabelSpan}>Count:</span>
          {`  ${payload[0].payload.count}`}
        </p>
        <p className={classes.customTooltipLabel}>
          <span className={classes.customTooltipLabelSpan}>Rank:</span>
          {` ${payload[0].payload.rank}`}
        </p>
      </div>
    );
  }
  return null;
};

function LineCharts({ chartDatasets }) {
  const classes = useStyles();

  return (
    <>
      {chartDatasets.map(data => (
        <div className={classes.chartContainer} key={data.word + 'cont'}>
          <h1 key={data.word + 'h1'} className={classes.chartTitle}>
            {data.word}
          </h1>
          <ResponsiveContainer>
            <LineChart
              data={data.data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
              key={data.word}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip content={<CustomTooltip classes={classes} />} />
              <Line
                type="monotone"
                dataKey="freq"
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
  chartDatasets: PropTypes.arrayOf(
    PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.string),
      datasets: PropTypes.arrayOf(
        PropTypes.shape({ data: PropTypes.array.isRequired }),
      ),
    }),
  ).isRequired,
};

export default LineCharts;
