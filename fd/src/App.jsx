import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Cart from './pages/cart';
import Login from './pages/login';
import Register from './pages/register';
import CreateProduct from './pages/createProduct';
import NavbarComponent from './components/NavbarComponent';
import { ToastContainer } from 'react-toastify';

const AppWrapper = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <ToastContainer />
      {!hideNavbar && <NavbarComponent />}
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/cart" element={token ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/create" element={token ? <CreateProduct /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);

export default App;
