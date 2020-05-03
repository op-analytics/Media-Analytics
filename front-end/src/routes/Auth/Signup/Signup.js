import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../../state/ducks/user';

const CAPTCHA_KEY = process.env.REACT_APP_CAPTCHA_KEY;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  captcha: {
    margin: '0 auto',
    marginTop: '1rem',
    width: '304px',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [isHuman, setIsHuman] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const errors = useSelector((state) => state.user.errors) || [];

  let nameHasError = false;
  let nameHelperText = '';
  let emailHasError = false;
  let emailHelperText = '';
  let passwordHasError = false;
  let passwordHelperText = '';
  let confirmPasswordHasError = false;
  let confirmPasswordHelperText = '';

  if (errors.length > 0) {
    const errorType = errors.length > 0 ? errors[0].type[0] : '';
    switch (errorType) {
      case 'name':
        nameHasError = true;
        nameHelperText = errors[0].message;
        break;
      case 'email':
        emailHasError = true;
        emailHelperText = errors[0].message;
        break;
      case 'password':
        passwordHasError = true;
        passwordHelperText = errors[0].message;
        break;
      case 'confirmPassword':
        confirmPasswordHasError = true;
        confirmPasswordHelperText = errors[0].message;
        break;
      case 'general':
        nameHasError = true;
        emailHasError = true;
        passwordHasError = true;
        confirmPasswordHasError = true;
        confirmPasswordHelperText = errors[0].message;
        break;
      default:
        break;
    }
  }

  // eslint-disable-next-line no-console
  const submit = ({ name, email, password, confirmPassword }) => {
    if (isHuman) {
      dispatch(signup(name, email, password, confirmPassword));
    } else {
      setSnackBarOpen(true);
    }
  };

  const handleClose = (reason) =>
    reason !== 'clickaway' && setSnackBarOpen(false);

  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(submit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  autoComplete="name"
                  inputRef={register}
                  error={nameHasError}
                  helperText={nameHelperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={register}
                  error={emailHasError}
                  helperText={emailHelperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  inputRef={register}
                  error={passwordHasError}
                  helperText={passwordHelperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  inputRef={register}
                  error={confirmPasswordHasError}
                  helperText={confirmPasswordHelperText}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <ReCAPTCHA
              className={classes.captcha}
              sitekey={CAPTCHA_KEY}
              onChange={() => setIsHuman(true)}
              render="explict"
            />
          </form>
        </div>
      </Container>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Please prove that you are not a robot
        </Alert>
      </Snackbar>
    </>
  );
}
