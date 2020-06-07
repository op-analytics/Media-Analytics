import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Pages = () => {
  const toggleEnabled = () => {
    if (timelineEnabled) {
      setDialogOpen(true);
    } else {
      setEnabled(true)
    }
  };

  const handleYes = () => {
    setDialogOpen(false);
    setEnabled(false);
  };

  const handleNo = () => {
    setDialogOpen(false);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const timelineEnabled = useStoreState(state => state.timeline.enabled);
  const setEnabled = useStoreActions(state => state.timeline.setEnabled);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
        <FormControlLabel
            control={
            <Switch
                checked={timelineEnabled}
                onChange={toggleEnabled}
                name="checkedB"
                color="primary"
            />
            }
            label="Access timeline pages"
        />

      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Remove access to pages?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove access to all timeline pages?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo} color="primary">
            No
          </Button>
          <Button onClick={handleYes} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Pages;
