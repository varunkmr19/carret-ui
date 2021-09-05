import React from 'react';

const ProductCard = ({ product }) => {
  const priceInRupees = Number(product.price)/100;
  return (
    <div className="card" key={product.id}>
      <div className="card-content">
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>{`₹${priceInRupees}`}</p>
      </div>
    </div>
  );
}

export default ProductCard;