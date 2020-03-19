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

/**
 * Dynamic form
 * @component
 */
const Form = ({ formData, buttonText, onSubmit }) => {
  const [formInput, setFormInput] = useState({});
  const classes = useStyles();

  const handleChange = event => {
    const formInputCopy = { ...formInput };
    formInputCopy[event.target.name] = event.target.value;
    setFormInput(formInputCopy);
  };

  return (
    <form
      className={classes.form}
      onSubmit={e => {
        e.preventDefault();
        onSubmit(formInput);
      }}
    >
      {formData.map(f => (
        <FormControl key={f.name} className={classes.formControl}>
          <TextField
            className={classes.textField}
            margin="normal"
            label={`${f.label || f.name}:`}
            name={f.name}
            value={f.text}
            onChange={handleChange}
            placeholder={f.placeholder}
            required={f.required}
          />
        </FormControl>
      ))}
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        className={classes.button}
      >
        {buttonText}
      </Button>
    </form>
  );
};

Form.defaultProps = { buttonText: 'Submit' };

Form.propTypes = {
  /**
   * The function to call on form submit
   * Will receive a data object consisting of all
   * formData names and there values
   */
  onSubmit: PropTypes.func.isRequired,
  /** The form data to build the form from */
  formData: PropTypes.arrayOf(
    PropTypes.shape({
      /** The fields name */
      name: PropTypes.string.isRequired,
      /** The fields label */
      label: PropTypes.string,
      /** The fields key */
      key: PropTypes.string,
      /** The fields placeholder */
      placeholder: PropTypes.string,
      /** Wether or not the field is required */
      required: PropTypes.bool,
    }),
  ).isRequired,
  /** The submit buttons text*/
  buttonText: PropTypes.string,
};

export default Form;
