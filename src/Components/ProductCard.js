import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const ProductCard = ({ product, showRazorpay }) => {
  const priceInRupees = Number(product.price)/100;
  return (
    <Card key={product.id}>
      <CardContent>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>Price: ₹{priceInRupees}</p>
        <Button variant="contained" color="primary" onClick={() => showRazorpay(product.id)}>
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;