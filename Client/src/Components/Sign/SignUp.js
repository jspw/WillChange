import React, { useState } from "react";
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Forms from './Forms';
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
    width: '15vw',
    margin: theme.spacing(1),
  },
}));

export default function SignUp() {

  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: '',
    designation: '',
    university: '',
    department: '',
    session: '',
    regNo: '',
    result: '',
  });
  console.log(values.email);
  const obj = {
    role: values.role,
    username: values.username,
    email: values.email,
    password: values.password,
    repassword: values.confirmPassword,
    firstName: values.firstName,
    lastName: values.lastName,
    department: values.department,
    registrationNo: parseInt(values.regNo, 10),
    session: values.session,
    varsity: values.university,
  };
  const body = JSON.stringify(obj);
  const handleSignUp = (e) => {
      temp();
      e.preventDefault();
  }
  const temp = async () => {
    const domain = 'http://19bd18c73cba.ngrok.io/';
    let endpoint;
    if(values.role === "teacher") endpoint = 'auth/create-teacher';
    else endpoint = 'auth/create-student';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    };
    const response = await fetch(`${domain}${endpoint}`, requestOptions);
    const data = await response.json();
    console.log(data);
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Container>
      <form onSubmit={handleSignUp}>
        <Forms
          id="role"
          type="select"
          label="Role"
          labelWidth={112}
          classes={classes}
          values={values.role}
          handleChange={handleChange}
        />
        <br></br>
        <Forms
          id="university"
          type="select"
          label="University"
          labelWidth={112}
          classes={classes}
          values={values.university}
          handleChange={handleChange}
        />
        <Forms
          id="department"
          type="select"
          label="Department"
          labelWidth={112}
          classes={classes}
          values={values.department}
          handleChange={handleChange}
        />
        <br></br>
        {values.role !== "teacher" ? (
          <>
            <Forms
              id="session"
              type="select"
              label="Session"
              labelWidth={112}
              classes={classes}
              values={values.session}
              handleChange={handleChange}
            />
            <Forms
              id="regNo"
              type="text"
              label="Registration No"
              labelWidth={112}
              classes={classes}
              values={values.regNo}
              handleChange={handleChange}
            />
            <br></br>
          </>
        ) : (
          <Forms
            id="designation"
            type="select"
            label="Designation"
            labelWidth={112}
            classes={classes}
            values={values.designation}
            handleChange={handleChange}
          />
        )}
        <Forms
          id="firstName"
          type="text"
          label="First Name"
          labelWidth={78}
          classes={classes}
          values={values.firstName}
          handleChange={handleChange}
        />
        <Forms
          id="lastName"
          type="text"
          label="Last Name"
          labelWidth={78}
          classes={classes}
          values={values.lastName}
          handleChange={handleChange}
        />
        <br></br>
        <Forms
          id="username"
          type="text"
          label="Username"
          labelWidth={73}
          classes={classes}
          values={values.username}
          handleChange={handleChange}
        />
        <br></br>
        <Forms
          id="email"
          type="text"
          label="Email Address"
          labelWidth={102}
          classes={classes}
          values={values.email}
          handleChange={handleChange}
        />
        <br></br>
        <Forms
          id="password"
          label="Password"
          type="password"
          labelWidth={70}
          classes={classes}
          values={values.password}
          handleChange={handleChange}
        />
        <Forms
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          labelWidth={135}
          classes={classes}
          values={values.confirmPassword}
          handleChange={handleChange}
        />
        <br></br>
        <Button variant="contained" value="Sign Up" type="submit">
          Sign Up
        </Button>
      </form>
    </Container>
  );
}
    