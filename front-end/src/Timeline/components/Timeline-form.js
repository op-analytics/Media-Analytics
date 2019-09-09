/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';


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

  const [words, setWords] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  return (
    <form className={classes.form} onSubmit={e => onSubmitHandler(e, yearFrom, yearTo, words)}>
      <FormControl className={classes.formControl}>
        <TextField
          label="Words:"
          name="words"
          className={classes.textField}
          value={words}
          margin="normal"
          onChange={e => setWords(e.target.value)}
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
