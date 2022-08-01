import { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../assets/css/CartOverlay.css";
import CartItem from "./CartItem";
import CartContext from "../context/CartContext";

class CartOverlay extends Component {
  static contextType = CartContext;

  render() {
    const { showCartOverlay } = this.props;
    const { orderData, currency, onAdd, onRemove } = this.context;

    if (!showCartOverlay) return null;

    const productsPrice = orderData.reduce((a, c) => {
      const currentCurrency = c.prices.find(
        (price) => price.currency.symbol === currency
      );
      return a + c.qty * currentCurrency.amount;
    }, 0);

    const taxPrice = productsPrice * 0.21;

    const totalPrice = (productsPrice + taxPrice).toFixed(2);

    return ReactDOM.createPortal(
      <>
        {showCartOverlay && (
          <>
            <div className="overlay-styles" />
            <div id="cart-overlay">
              <div className="cart-overlay-wrapper">
                <div className="title">
                  <p>My Bag,</p> <p>{orderData.length} items</p>
                </div>

                {orderData?.length > 0 ? (
                  <>
                    {orderData?.map((cartData) => (
                      <CartItem key={cartData?.id} cartData={cartData} />
                    ))}
                  </>
                ) : (
                  <h3 className="empty-msg">Empty Cart</h3>
                )}

                <div className="total">
                  <p>Total</p>
                  <p>{currency + totalPrice}</p>
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
