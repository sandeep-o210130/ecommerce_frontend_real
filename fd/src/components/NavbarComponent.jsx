import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [cartCount, setCartCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
    return cart.length;
  });

  useEffect(() => {
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
      setCartCount(updatedCart.length);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">ShopEase</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/create">Create Product</Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/cart">
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
