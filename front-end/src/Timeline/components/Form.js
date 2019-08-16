import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

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
    width: '1.5 rems',
  }
}));

export default function Form() {
  const [word, setWord] = useState("example");
  const [startYear, setStartYear] = useState("1970");
  const [endYear, setEndYear] = useState("2018");
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

  function StartYearInput() {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-helper">Start Year</InputLabel>
        <Input
          id="component-helper"
          value={startYear}
          onChange={e => setStartYear(e.target.value)}
          aria-describedby="component-helper-text"
        />
      </FormControl>
    );
  }

  function EndYearInput() {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-helper">End Year</InputLabel>
        <Input
          id="component-helper"
          value={endYear}
          onChange={e => setEndYear(e.target.value)}
          aria-describedby="component-helper-text"
        />
      </FormControl>
    );
  }

  return (
    <form className={classes.container}>
      <WordInput />
      <StartYearInput />
      <EndYearInput />
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
