import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from './ProductCard';
import alertify from 'alertifyjs';

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
    axios.get(`${process.env.REACT_APP_BASE_URL}api/products`).then(res => {
      if (res.data.status === 200){
        setProducts(res.data.data);
      } else {
        alertify.error('Something went wrong!');
      }
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const handlePaymentSuccess = async (response) => {
    try {
      const fd = new FormData();
      fd.append("response", JSON.stringify(response));

      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}api/verify-payment`,
        data: fd,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      }).then(res => {
        if (res.data){
          alertify.success('Payment Successful!');
        }
      }).catch(err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  };

  async function showRazorpay(product_id) {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if(!res) {
      alertify.error('Razorpay SDK failed to load. Are you online?')
      return
    }
    
    let fd = new FormData();
    fd.append('product_id', product_id);
    fd.append('auth_key', process.env.REACT_APP_AUTH_KEY);

    const data = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}api/create-order`,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      data: fd
    }).then(res => {
      return res;
    }).catch(err => {
      console.log(err);
    })

    const options = {
      key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
      key_secret: process.env.REACT_APP_RAZORPAY_KEY_SECRET,
      amount: data.data.data.amount,
      currency: "INR",
      name: data.data.data.name,
      description: data.data.data.description,
      image: "",
      order_id: data.data.data.order_id,
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone"
      },
  };

  const paymentObject = new window.Razorpay(options)
  paymentObject.open();
}

  return (
    <Grid container className={classes.root} spacing={5}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={5}>
          {products.length > 0 ? products.map(product => (
            <Grid key={product.id} item> 
              <ProductCard key={product.id} product={product} showRazorpay={showRazorpay}/>
            </Grid>)) 
          : <h1>Loading...</h1>}
        </Grid>
      </Grid>
    </Grid> 
  );
}

export default Product;