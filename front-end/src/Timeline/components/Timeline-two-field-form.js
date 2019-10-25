/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';


const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input: {
    border: 'solid 1px black',
  },
  formControl: {
    margin: theme.spacing(1),
  },
  button: {
    maxHeight: '40px',
    marginTop: '36px',
  },
}));

function Form({
  onSubmitHandler,
}) {
  const classes = useStyles();

  const [concept1, setConcept1] = useState('');
  const [concept2, setConcept2] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  return (
    <form className={classes.form} onSubmit={e => onSubmitHandler(e, yearFrom, yearTo, concept1, concept2)}>
      <FormControl className={classes.formControl}>
        <TextField
          label="Words:"
          name="words-1"
          className={classes.textField}
          value={concept1}
          margin="normal"
          onChange={e => setConcept1(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label="Words:"
          name="words-2"
          className={classes.textField}
          value={concept2}
          margin="normal"
          onChange={e => setConcept2(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label="Year from:"
          name="year-from"
          className={classes.textField}
          value={yearFrom}
          margin="normal"
          onChange={e => setYearFrom(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label="Year to:"
          name="year-to"
          className={classes.textField}
          value={yearTo}
          margin="normal"
          onChange={e => setYearTo(e.target.value)}
        />
      </FormControl>
      <Button variant="outlined" color="primary" type="submit" className={classes.button}>
        Submit
      </Button>
    </form>
  );
}

Form.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
};

export default Form;
