import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  },
  slider: {
    paddingLeft: 2,

  }
}));

const marks = [{ value: 1960, label: "1960" }, { value: 2020, label: "2020" }];

export default function Form() {
  const [word, setWord] = useState("example");
  const [yearRange, setYearRange] = useState([1970, 2018]);
  const classes = useStyles();

  function WordInput() {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-helper">Word</InputLabel>
        <Input
          id="component-helper"
          value={word}
          onChange={e => setWord(e.target.value)}
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">
          Can be a comma separated list
        </FormHelperText>
      </FormControl>
    );
  }

  return (
    <form >
      <WordInput />
      <div className={classes.slider}>
        <h4>Year range</h4>
        <Slider
          aria-label="airbnb slider"
          valueLabelDisplay="auto"
          value={yearRange}
          onChange={(_, newValue) => setYearRange(newValue)}
          getAriaValueText={value => `${value}`}
          min={1960}
          max={2020}
          marks={marks}
        />
      </div>
    </form>
  );
}
