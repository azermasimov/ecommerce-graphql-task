import { Component } from "react";
import "../assets/css/CartPageItem.css";
import sliderArrow from "../assets/svg/sliderArrow.svg";
import CartContext from "../Context/CartContext";

class CartPageItem extends Component {
  state = {
    imgIndex: 0,
  };

  static contextType = CartContext;

  render() {
    const { cartData } = this.props;

    const {
      currency,
      onAdd,
      onRemove,
      selectedAttributes,
      onSelectAttributes,
    } = this.context;

    if (this.state.imgIndex > cartData.gallery.length - 1) {
      this.state.imgIndex = 0;
    }

    if (this.state.imgIndex < 0) {
      this.state.imgIndex = cartData.gallery.length - 1;
    }

    return (
      <div>
        <div className="cart-page-product-container">
          <div className="product-info">
            <p className="brand">{cartData.brand}</p>
            <p className="product-name">{cartData.name}</p>

            {cartData.prices.map(
              (price) =>
                price.currency.symbol === currency && (
                  <p key={price.amount} className="price">
                    {currency} {(price.amount * cartData.qty).toFixed(2)}
                  </p>
                )
            )}

            <div className="attributes">
              {cartData.attributes.map((attribute) => (
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
                            (x) =>
                              x.attributeId === attribute.id && x.id === item.id
                          ) && "active"
                        }`}
                        style={
                          attribute.name === "Color"
                            ? {
                                background: `${item.value}`,
                              }
                            : null
                        }
                        onClick={() => onSelectAttributes(attribute.id, item)}
                      >
                        {attribute.name === "Color" ? null : item.value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="count-img-wrapper">
            <div className="count-wrapper">
              <div onClick={() => onAdd(cartData)}>+</div>
              <p>{cartData.qty}</p>
              <div onClick={() => onRemove(cartData)}>-</div>
            </div>

            <div className="product-img">
              <img src={cartData.gallery[this.state.imgIndex]} alt="product" />

              {cartData.gallery.length > 1 && (
                <>
                  <div
                    className="left"
                    onClick={() =>
                      this.setState({ imgIndex: this.state.imgIndex - 1 })
                    }
                  >
                    <img src={sliderArrow} alt="slider arrow icon" />
                  </div>
                  <div
                    className="right"
                    onClick={() =>
                      this.setState({ imgIndex: this.state.imgIndex + 1 })
                    }
                  >
                    <img src={sliderArrow} alt="slider arrow icon" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div id="bottom-line"></div>
      </div>
    );
  }
}

export default CartPageItem;
