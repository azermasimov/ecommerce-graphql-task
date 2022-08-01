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

  onAdd = (productData) => {
    const exist = this.state.orderData.find((x) => x.id === productData.id);

    if (exist) {
      this.setState({
        orderData: this.state.orderData.map((x) =>
          x.id === productData.id ? { ...exist, qty: exist.qty + 1 } : x
        ),
      });
    } else {
      this.setState({
        orderData: [...this.state.orderData, { ...productData, qty: 1 }],
      });
    }
  };

  onRemove = (productData) => {
    const exist = this.state.orderData.find((x) => x.id === productData.id);

    if (exist.qty === 1) {
      this.setState({
        orderData: this.state.orderData.filter((x) => x.id !== productData.id),
      });
    } else {
      this.setState({
        orderData: this.state.orderData.map((x) =>
          x.id === productData.id ? { ...exist, qty: exist.qty - 1 } : x
        ),
      });
    }
  };

  setSelectedAttributes = (id, value, productId) => {
    this.setState({
      selectedAttributes: [
        ...this.state.selectedAttributes,
        {
          productId: productId,
          id: id,
          value: value,
        },
      ],
    });
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
          onAdd: this.onAdd,
          onRemove: this.onRemove,
          setSelectedAttributes: this.setSelectedAttributes,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
