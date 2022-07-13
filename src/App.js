import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Category from "./pages/Category";
import ProductDescription from "./pages/ProductDescription";
import Cart from "./pages/Cart";
import "./assets/css/App.css";

class App extends Component {
  state = {
    currency: "$",
    // orderDetails: {},
  };

  // Get currency from child component-(Navbar.jsx)
  handleCurrency = (childData) => {
    this.setState({ currency: childData });
  };

  // Get orderData from child component-(ProductDescription.jsx)
  // handleOrderDetails = (childData) => {
  //   this.setState({ orderDetails: childData });
  // };

  render() {
    console.log(this.state.orderDetails);

    return (
      <div className="container">
        <Router>
          <Navbar
            currency={this.handleCurrency}
            symbol={this.state.currency}
          />

          <Routes>
            <Route
              path="/"
              element={<Category symbol={this.state.currency} />}
            />
            <Route
              path="/clothes"
              element={<Category symbol={this.state.currency} />}
            />
            <Route
              path="/tech"
              element={<Category symbol={this.state.currency} />}
            />
            <Route
              path={`/product/:id`}
              element={
                <ProductDescription
                  symbol={this.state.currency}
                  // orderDetails={this.handleOrderDetails}
                />
              }
            />

            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
