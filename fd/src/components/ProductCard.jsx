import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="card m-3 shadow-sm" style={{ width: "18rem" }}>
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">₹{product.price}</p>
        <button onClick={() => addToCart(product)} className="btn btn-primary w-100">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
