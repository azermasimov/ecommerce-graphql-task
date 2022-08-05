import { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/css/CartOverlay.css";
import CartItem from "./CartItem";
import CartContext from "../Context/CartContext";

class CartOverlay extends Component {
  state = {
    showAllItems: false,
  };

  static contextType = CartContext;

  render() {
    const { orderData, currency, onDisplayCartOverlay, showCartOverlay } =
      this.context;
    const { showAllItems } = this.state;

    const productsPrice = orderData.reduce((a, c) => {
      const currentCurrency = c.prices.find(
        (price) => price.currency.symbol === currency
      );
      return a + c.qty * currentCurrency.amount;
    }, 0);

    const taxPrice = productsPrice * 0.21;

    const totalPrice = (productsPrice + taxPrice).toFixed(2);

    return (
      <>
        <div
          className="overlay-styles"
          onClick={() => onDisplayCartOverlay(showCartOverlay)}
        />
        <div id="cart-overlay">
          <div className="cart-overlay-wrapper">
            <div className="title">
              <p>My Bag,</p>{" "}
              <p>
                {orderData.length} {orderData.length > 1 ? "items" : "item"}
              </p>
            </div>

            {orderData?.length > 0 ? (
              <>
                {showAllItems ? (
                  orderData?.map((cartData) => (
                    <CartItem key={cartData?.id} cartData={cartData} />
                  ))
                ) : (
                  <CartItem cartData={orderData[0]} />
                )}
              </>
            ) : (
              <h3 className="empty-msg">Empty Cart</h3>
            )}

            {orderData.length > 0 && (
              <p
                className="show-hide-items"
                onClick={() => this.setState({ showAllItems: !showAllItems })}
              >
                {showAllItems ? "Show Less" : "Show All"}
              </p>
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
    );
  }
}

export default CartOverlay;
