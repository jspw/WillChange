import React from 'react';
import Grid from '@material-ui/core/Grid';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Container, Button } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "./SignIn.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25vw',
  },
}));


export default function SignIn() {

  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <form>
        <Grid
          container
          spacing={1}
          justify="center"
          alignItems="center"
          direction="row"
        >
          <Grid item>
            <EmailOutlinedIcon />
          </Grid>
          <Grid item>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel>Email Address</InputLabel>
              <OutlinedInput
                id="email"
                onChange={handleChange("email")}
                labelWidth={102}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <LockOutlinedIcon />
          </Grid>
          <Grid item>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="password"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Button variant="contained" color="default" type="submit" >
            Sign In
          </Button>
        </Grid>
      </form>
    </Container>
  );
}
    