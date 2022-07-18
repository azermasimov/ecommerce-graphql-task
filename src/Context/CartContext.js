import React, { Component } from "react";

const CartContext = React.createContext();

export class CartProvider extends Component {
  state = {
    currency: "$",
    orderData: [],
    selectedAttributes: [],
    cartItemQty: 1,
  };

  onChangeCurrency = (symbol) => {
    this.setState({ currency: symbol });
  };

  sendCartData = (productData) => {
    this.setState({ orderData: { ...this.state.orderData, productData } });
  };

  setSelectedAttributes = (id, value) => {
    this.setState({
      selectedAttributes: [
        ...this.state.selectedAttributes,
        {
          id: id,
          value: value,
        },
      ],
    });
  };

  increaseQty = () => {
    this.setState({
      cartItemQty: this.state.cartItemQty + 1,
    });
  };

  decreaseQty = () => {
    this.state.cartItemQty > 1 &&
      this.setState({
        cartItemQty: this.state.cartItemQty - 1,
      });
  };

  render() {
    const { currency, orderData, selectedAttributes, cartItemQty } = this.state;

    return (
      <CartContext.Provider
        value={{
          currency,
          orderData,
          selectedAttributes,
          cartItemQty,
          onChangeCurrency: this.onChangeCurrency,
          // handleOrderDetails: this.handleOrderDetails,
          sendCartData: this.sendCartData,
          setSelectedAttributes: this.setSelectedAttributes,
          increaseQty: this.increaseQty,
          decreaseQty: this.decreaseQty,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
