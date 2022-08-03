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

  onAdd = (productData, selectedAttributes) => {
    const exist = this.state.orderData.find((x) => x.id === productData.id);

    if (exist) {
      this.setState({
        orderData: this.state.orderData.map((x) =>
          x.id === productData.id
            ? {
                ...exist,
                qty: exist.qty + 1,
                selectedAttributes: exist.selectedAttributes,
              }
            : x
        ),
      });
    } else {
      this.setState({
        orderData: [
          ...this.state.orderData,
          { ...productData, qty: 1, selectedAttributes: selectedAttributes },
        ],
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

  onSelectAttributes = (attributeId, item) => {
    const exist = this.state.selectedAttributes.find(
      (x) => x.attributeId === attributeId
    );

    if (!exist) {
      this.setState({
        selectedAttributes: [
          ...this.state.selectedAttributes,
          {
            attributeId: attributeId,
            id: item.id,
            value: item.value,
          },
        ],
      });
    } else {
      this.setState({
        selectedAttributes: [
          {
            attributeId: attributeId,
            id: item.id,
            value: item.value,
          },
        ],
      });
    }
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
          onSelectAttributes: this.onSelectAttributes,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
