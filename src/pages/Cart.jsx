import { Component } from "react";
import "../assets/css/Cart.css";
import CartPageItem from "../components/CartPageItem";

class Cart extends Component {
  render() {
    return (
      <>
        <div className="cart-container">
          <h2>Cart</h2>
          <div className="line"></div>
          <CartPageItem />

          <div className="price-wrapper">
            <div className="tax">
              <p>Tax 21%:</p>
              <p>$42.00</p>
            </div>

            <div className="quantity">
              <p>Quantity:</p>
              <p>3</p>
            </div>

            <div className="total">
              <p>Total:</p>
              <p>$200.00</p>
            </div>

            <button type="button">Order</button>
          </div>
        </div>
      </>
    );
  }
}

export default Cart;
