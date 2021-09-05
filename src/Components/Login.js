import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import { useForm } from "./useForm"
import axiosInstance from "../axiosApi";


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

const handleSubmit = async (e, values) => {
  e.preventDefault();
  const username = values.username;
  const password = values.password;
  try{
    const res = await axiosInstance.post('/token/obtain/', {
      username: username,
      password: password
    });
    axiosInstance.defaults.headers['Autorization'] = `JWT ${res.data.access}`;
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    return res;
  } catch(err){
    throw err;
  }
}


export default function Login() {
  const classes = useStyles();

  const [values, handleChange] = useForm({ username: "", password: "" });
  
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
                />
              </Grid>
              <Grid className={classes.formField} item>
                <TextField 
                  name="password" 
                  type="password" 
                  label="Password"
                  value={values.password}
                  onChange={handleChange} 
                />
              </Grid>
              <Grid className={classes.formField} item>
                <Button type="submit" variant="contained" color="primary"> Login </Button>
              </Grid>
          </Grid>
        </form>
        </Paper>
      </Grid>
    </div>
  );
}