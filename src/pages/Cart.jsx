import { Component } from "react";
import "../assets/css/Cart.css";
import CartPageItem from "../components/CartPageItem";
import CartContext from "../context/CartContext";

class Cart extends Component {
  static contextType = CartContext;

  render() {
    const { orderData, currency } = this.context;

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
        <div className="cart-container">
          <h2>Cart</h2>

          <div className="line"></div>

          {orderData?.length > 0 ? (
            <>
              {orderData?.map((cartData) => (
                <CartPageItem key={cartData?.id} cartData={cartData} />
              ))}
            </>
          ) : (
            <h3 className="empty-msg">Empty Cart</h3>
          )}

          <div className="price-wrapper">
            <div className="tax">
              <p>Tax 21%:</p>
              <p>{currency + taxPrice.toFixed(2)}</p>
            </div>

            <div className="quantity">
              <p>Quantity:</p>
              <p>{orderData.length}</p>
            </div>

            <div className="total">
              <p>Total:</p>
              <p>{currency + totalPrice}</p>
            </div>

            <button type="button">Order</button>
          </div>
        </div>
      </>
    );
  }
}
export default Cart;
