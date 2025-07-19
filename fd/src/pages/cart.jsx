import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
    setCart(items);
  }, [email]);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const checkout = () => {
    toast.success("Order Placed Successfully ✅", { autoClose: 1500 });
    localStorage.removeItem(`cart_${email}`);
    window.dispatchEvent(new Event("cartUpdated"));
    setCart([]);
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> : (
        <>
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                {item.name}
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>
          <h4 className="mt-3">Total: ₹{total}</h4>
          <button className="btn btn-success mt-3 w-10" onClick={checkout}>Confirm Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
