import { makeStyles } from '@material-ui/core/styles';

export const useSharedStyles = makeStyles(() => ({
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
