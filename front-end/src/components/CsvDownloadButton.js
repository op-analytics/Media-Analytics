import React from 'react';
import Fab from '@material-ui/core/Fab';
import TooltipUI from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import { CSVLink } from 'react-csv';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20,
  },
  icon: {
    display: 'block',
    margin: 'auto',
  },
}));

export default function CsvDownloadButton({ data, filename, headers }) {
  const classes = useStyles();
  return (
    <TooltipUI title="Download as csv" placement="right" arrow>
      <Fab color="secondary" aria-label="download" className={classes.fab}>
        <CSVLink data={data} headers={headers} filename={filename}>
          <GetAppIcon fontSize="large" className={classes.icon}/>
        </CSVLink>
      </Fab>
    </TooltipUI>
  );
}

// TODO: Proptypes
