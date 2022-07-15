import React, { Component } from "react";

const CartContext = React.createContext();

export class CartProvider extends Component {
  state = {
    currency: "$",
    orderData: [],
    selectedAttributes: [],
  };

  onChangeCurrency = (symbol) => {
    this.setState({ currency: symbol });
  };

  handleOrderDetails = (productData, attributes) => {
    this.setState({ orderData: { ...this.state.orderData, productData } });
    this.setState({
      selectedAttributes: {
        ...this.state.selectedAttributes,
        attributes,
      },
    });
  };

  sendCartData = (productData, selectedAttributes) => {
    this.handleOrderDetails(productData, selectedAttributes);
  };

  render() {
    const { currency, orderData, selectedAttributes } = this.state;
    return (
      <CartContext.Provider
        value={{
          currency,
          orderData,
          selectedAttributes,
          onChangeCurrency: this.onChangeCurrency,
          handleOrderDetails: this.handleOrderDetails,
          sendCartData: this.sendCartData,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
