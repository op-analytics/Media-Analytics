import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles({
  alert: {
    marginTop: 20,
    width: '45vw',
    minWidth: '400px',
  },
});

let message

/**
 * A feedback bar used to show errors on the timeline views
 * @component
 */
// FIXME: This component should only recieve a
// message to display not the errors
function FeedbackBar({ errors }) {
  const classes = useStyles();
  switch (errors[0].message) {
    case 'Not Found':
      message = 'No data matching your words were found'
      break;
    default:
      message = errors[0].message
  }

  return (
    <Alert severity="warning" className={classes.alert}>{message}</Alert>
  );
}

FeedbackBar.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FeedbackBar;