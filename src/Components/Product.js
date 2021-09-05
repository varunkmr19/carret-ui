import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Product = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products').then(res => {
      if (res.data.status === 200){
        setProducts(res.data.data);
      } else {
        console.log("Something went wrong");
      }
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <Grid container className={classes.root} spacing={5}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={5}>
          {products.length > 0 ? products.map(product => (
            <Grid key={product.id} item> 
              <ProductCard key={product.id} product={product} />
            </Grid>)) 
          : <h1>Loading...</h1>}
        </Grid>
      </Grid>
    </Grid> 
  );
}

export default Product;