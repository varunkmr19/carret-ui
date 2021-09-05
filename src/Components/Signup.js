import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import { useForm } from "./useForm"
import axiosInstance from "../axiosApi";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  container: {
    minHeight: '90vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  formField: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  }
}));

const getCSRFToken = () => {
  axios({
    method: 'get',
    url: 'http://localhost:8000/auth/get_csrf',
  }).then(res => {
    localStorage.setItem('csrf_token', res.data.data.csrf);
  })
}

const handleSubmit = async (e, values) => {
  e.preventDefault();
  getCSRFToken();
  const username = values.username;
  const email = values.email;
  const password = values.password;
  const confirmPassword = values.confirmPassword;
  if(password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  try {
    const res = await axiosInstance.post("/register", {
      username: username,
      email: email,
      password: password,
      confirm_password: confirmPassword
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}


export default function Signup() {
  const classes = useStyles();

  const [values, handleChange] = useForm({ username: "", email: "", password: "", confirmPassword: "" });
  
  return (
    <div className={classes.margin}>
      <Grid className={classes.container} container direction="column" justifyContent="center" alignContent="center" alignItems="center" spacing={2}>
        <Paper className={classes.paper}>
        <form onSubmit={(e) => handleSubmit(e, values)}>
          <Grid container spacing={1} alignItems="center" alignContent="space-between" direction="column">
              <Grid className={classes.formField} item>
                <TextField 
                  name="username" 
                  label="Username"
                  value={values.username}
                  onChange={handleChange} 
                  required
                />
              </Grid>
              <Grid className={classes.formField} item>
                <TextField 
                  type="email" 
                  name="email" 
                  label="Email"
                  value={values.email}
                  onChange={handleChange} 
                />
              </Grid>
              <Grid className={classes.formField} item>
                <TextField 
                  name="password" 
                  type="password" 
                  label="Password"
                  value={values.password}
                  onChange={handleChange} 
                  required
                />
              </Grid>
              <Grid className={classes.formField} item>
                <TextField 
                  name="confirmPassword" 
                  type="password" 
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange} 
                  required 
                />
              </Grid>
              <Grid className={classes.formField} item>
                <Button type='submit' variant="contained" color="primary"> Signup </Button>
              </Grid>
          </Grid>
        </form>
        </Paper>
      </Grid>
    </div>
  );
}