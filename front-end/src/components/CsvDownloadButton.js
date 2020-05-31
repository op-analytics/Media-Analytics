import Fab from '@material-ui/core/Fab';
import GetAppIcon from '@material-ui/icons/GetApp';
import TooltipUI from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { CSVLink } from 'react-csv';


const useStyles = theme => ({
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

class CsvDownloadButton extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <TooltipUI title="Download as csv" placement="right" arrow>
        <Fab color="secondary" aria-label="download" className={classes.fab}>
          <CSVLink
            data={this.props.data}
            headers={this.props.headers}
            filename={this.props.filename}
          >
            <GetAppIcon fontSize="large" className={classes.icon} />
          </CSVLink>
        </Fab>
      </TooltipUI>
    );
  }
}

CsvDownloadButton.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  headers: PropTypes.array,
  filename: PropTypes.string
}

export default withStyles(useStyles)(CsvDownloadButton);
