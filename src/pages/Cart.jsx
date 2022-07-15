import { Component } from "react";
import "../assets/css/Cart.css";
import CartPageItem from "../components/CartPageItem";
import CartContext from "../Context/CartContext";

class Cart extends Component {
  static contextType = CartContext;

  render() {
    const { orderData } = this.context;

    // console.log(selectedAttributes.attributes.map((attribute) => attribute.id));
    console.log(orderData);

    return (
      <>
        <div className="cart-container">
          <h2>Cart</h2>
          <div className="line"></div>

          {orderData.length !== 0 ? (
            <>
              {orderData.productData.map((cartData) => (
                <CartPageItem cartData={cartData} />
              ))}
            </>
          ) : (
            <h3>Empty Cart</h3>
          )}

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
