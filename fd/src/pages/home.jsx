import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    axios.get("http://localhost:5050/api/products")
      .then(res => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
    currentCart.push(product);
    localStorage.setItem(`cart_${email}`, JSON.stringify(currentCart));
    toast.success(`${product.name} added to cart`, { autoClose: 1000 });

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const buyNow = (product) => {
    toast.success(`Order Confirmed for ${product.name} ✅`, { autoClose: 1500 });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Latest Products</h2>
      <div className="row">
        {products.map(p => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={p._id}>
            <div className="card shadow-sm h-100">
              <div style={{ height: "250px", backgroundColor: "#f8f9fa", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img 
                  src={p.image} 
                  alt={p.name} 
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} 
                />
              </div>
              <div className="card-body text-center d-flex flex-column">
                <h5>{p.name}</h5>
                <p>₹{p.price}</p>
                <button className="btn btn-primary mb-2" onClick={() => addToCart(p)}>Add to Cart</button>
                <button className="btn btn-success" onClick={() => buyNow(p)}>Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
