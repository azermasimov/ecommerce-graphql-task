import { Component } from "react";
import "../assets/css/CartItem.css";
import CartContext from "../context/CartContext";

class CartItem extends Component {
  static contextType = CartContext;

  render() {
    const { cartData } = this.props;
    const {
      currency,
      selectedAttributes,
      setSelectedAttributes,
      onAdd,
      onRemove,
    } = this.context;

    return (
      <div className="product-wrapper">
        <div className="product-info">
          <p>{cartData.brand}</p>
          <p>{cartData.name}</p>

          {cartData.prices.map(
            (price) =>
              price.currency.symbol === currency && (
                <p key={price.amount} className="price">
                  {currency} {(price.amount * cartData.qty).toFixed(2)}
                </p>
              )
          )}

          <div className="attributes">
            {cartData?.attributes.map((attribute) => (
              <div className="attribute" key={attribute.id}>
                <p className="name">{attribute.name}:</p>
                <div className="values">
                  {attribute.items.map((item) => (
                    <div
                      key={item.id}
                      className={`value ${
                        attribute.name === "Color" && "color-square"
                      } ${
                        selectedAttributes.some(
                          (att) =>
                            att.id === attribute.id && att.value === item.value
                        ) && "active"
                      }`}
                      style={
                        attribute.name === "Color"
                          ? {
                              background: `${item.value}`,
                            }
                          : null
                      }
                      onClick={() =>
                        setSelectedAttributes(attribute.id, item.value)
                      }
                    >
                      {attribute.name === "Color" ? null : item.value}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="count-wrapper">
          <div onClick={() => onAdd(cartData)}>+</div>
          <p>{cartData.qty}</p>
          <div onClick={() => onRemove(cartData)}>-</div>
        </div>

        <div className="product-img">
          <img src={cartData.gallery[0]} alt="product" />
        </div>
      </div>
    );
  }
}

export default CartItem;
