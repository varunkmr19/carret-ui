import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import { useForm } from "./useForm"


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

const handleSubmit = (e, values) => {
  e.preventDefault();
  const username = values.username;
  const email = values.email;
  const password = values.password;
  const confirmPassword = values.confirmPassword;
  if(password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  const fd = new FormData();
  fd.append('email', email);
  fd.append('username', username);
  fd.append('password', password);
  fd.append('confirm_password', confirmPassword);
  console.log(fd);
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