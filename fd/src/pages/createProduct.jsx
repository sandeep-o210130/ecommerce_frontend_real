import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: "", price: "", image: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5050/api/products/create", product);
    toast.success("Product Created Successfully ✅", { autoClose: 1500 });
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Create Product</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-control mb-3" placeholder="Product Name"
            value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
          <input type="number" className="form-control mb-3" placeholder="Price"
            value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
          <input type="text" className="form-control mb-3" placeholder="Image URL"
            value={product.image} onChange={(e) => setProduct({ ...product, image: e.target.value })} required />
          <textarea className="form-control mb-3" placeholder="Description"
            value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} required />
          <button type="submit" className="btn btn-primary w-100">Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
