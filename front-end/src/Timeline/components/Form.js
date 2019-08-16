import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  formControl: {
    margin: theme.spacing(1)
  },
  Button: {
    width: "1.5 rems"
  },
  root: {
    width: 300,
  }
}));

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
    <form className={classes.container}>
      <WordInput />
      <div className={classes.root}>
        <Slider
          // ThumbComponent={AirbnbThumbComponent}
          aria-label="airbnb slider"
          valueLabelDisplay="auto"
          value={yearRange}
          onChange={(_, newValue) => setYearRange(newValue)}
          getAriaValueText={value => `${value}`}
          min={1960}
          max={2020}
        />
      </div>
    </form>
  );
}
