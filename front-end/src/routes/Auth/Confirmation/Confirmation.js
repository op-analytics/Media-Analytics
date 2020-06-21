import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import React from 'react'
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
    width:'5rem',
    height:'5rem',
    backgroundColor: theme.palette.secondary.main,
  },
  mailIcon: {
    fontSize:'4rem',
  },

  title: {
    margin: '2rem 1rem 0 0',
    textAlign:"center"
  },
  textBlock: {
    margin: '0.5rem 0',
    textAlign:"center",
  },
  textContainer: {
    textAlign:"center",
  },
}));


/**
 * The Confirmation email has been sent page component
 * @component
 */
export default function Confirmation() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MailOutlineIcon className={classes.mailIcon} />
        </Avatar>
        <Typography className={classes.title} component="p" variant="h5">
          Validation email was sent successfully
        </Typography>
        <Container component="div" maxWidth="sm" className={classes.textContainer}>
          <Typography component="p" variant="body" className={classes.textBlock}>
            We&apos;ve sent you a link to confirm your email address. Please check your inbox. It could take up to 10 minutes to show up
          </Typography>
          <Typography component="p" variant="body" className={classes.textBlock}>
            If you have already confirmed your email&nbsp;
            <Link component={RouterLink} to="/login" variant="body2">
              click here
            </Link>
            &nbsp;to login
          </Typography>
        </Container>
      </div>
    </Container>
  )
}

