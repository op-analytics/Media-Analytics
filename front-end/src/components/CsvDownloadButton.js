import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import TooltipUI from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import PropTypes from 'prop-types';
import React from 'react';
import { CSVLink } from 'react-csv';

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20,
  },
  icon: {
    display: 'block',
    margin: 'auto',
  },
});

function CsvDownloadButton({ data, headers, filename }) {
  const classes = useStyles();
  return (
    <TooltipUI title="Download as csv" placement="right" arrow>
      <Fab color="secondary" aria-label="download" className={classes.fab}>
        <CSVLink data={data} headers={headers} filename={filename}>
          <GetAppIcon fontSize="large" className={classes.icon} />
        </CSVLink>
      </Fab>
    </TooltipUI>
  );
}

CsvDownloadButton.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf((PropTypes.object)).isRequired,
  filename: PropTypes.string.isRequired,
};

export default CsvDownloadButton;
