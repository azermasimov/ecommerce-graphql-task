import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Category from "./pages/Category";
import ProductDescription from "./pages/ProductDescription";
import Cart from "./pages/Cart";
import "./assets/css/App.css";
import { CartProvider } from "./Context/CartContext";

class App extends Component {
  render() {
    return (
      <CartProvider>
        <div className="container">
          <Router>
            <Navbar />

            <Routes>
              <Route path="/" element={<Category />} />
              <Route path="/clothes" element={<Category />} />
              <Route path="/tech" element={<Category />} />

              <Route path="/product/:id" element={<ProductDescription />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Router>
        </div>
      </CartProvider>
    );
  }
}

export default App;
