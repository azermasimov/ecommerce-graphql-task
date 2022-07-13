import { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../assets/css/CartOverlay.css";
import CartItem from "./CartItem";

class CartOverlay extends Component {
  render() {
    const { showCartOverlay } = this.props;

    if (!showCartOverlay) return null;

    return ReactDOM.createPortal(
      <>
        {showCartOverlay && (
          <>
            <div className="overlay-styles" />
            <div id="cart-overlay">
              <div className="cart-overlay-wrapper">
                <div className="title">
                  <p>My Bag,</p> <p>{3} items</p>
                </div>
                {/* use map higher order function to get cart items from object(data) */}
                <CartItem />
                <CartItem />

                <div className="total">
                  <p>Total</p>
                  <p>{"$ 200.00"}</p>
                </div>

                <div className="cart-btns">
                  <Link to="cart">
                    <button>View Bag</button>
                  </Link>
                  <button>Check Out</button>
                </div>
              </div>
            </div>
          </>
        )}
      </>,
      document.getElementById("portal")
    );
  }
}

export default CartOverlay;
