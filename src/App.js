import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './Components/ProductCard';

function App() {
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
    <div className="App">
      {products.length > 0 ? products.map(product => <ProductCard key={product.id} product={product} />) : <h1>Loading...</h1>} 
    </div>
  );
}

export default App;
