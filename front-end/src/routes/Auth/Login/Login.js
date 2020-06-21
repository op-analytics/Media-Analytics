import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/**
 * The login page component
 * @component
 */
export default function Login() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  const login = useStoreActions(state => state.user.login);
  const errors = useStoreState(state => state.user.errors);

  const submit = ({ email, password }) => login({ email, password });

  let passwordHasError = false;
  let passwordHelperText = '';
  let emailHasError = false;
  let emailHelperText = '';

  if (errors.length > 0) {
    const errorType = errors.length > 0 ? errors[0].type[0] : '';
    switch (errorType) {
      case 'password':
        passwordHasError = true;
        passwordHelperText = errors[0].message;
        break;
      case 'email':
        emailHasError = true;
        emailHelperText = errors[0].message;
        break;
      case 'general':
        passwordHasError = true;
        passwordHelperText = errors[0].message;
        emailHasError = true;
        break;
      default:
        break;
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register}
            error={emailHasError}
            helperText={emailHelperText}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
            error={passwordHasError}
            helperText={passwordHelperText}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            id="submit"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                Don&#39;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
