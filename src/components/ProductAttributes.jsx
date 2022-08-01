import { Component } from "react";
import CartContext from "../context/CartContext";
import "../assets/css/ProductAttributes.css";

class ProductAttributes extends Component {
  state = {
    attributes: [],
  };

  static contextType = CartContext;

  render() {
    const { data } = this.props;
    const { selectedAttributes, setSelectedAttributes } = this.context;

    return (
      <div className="attributes">
        {data.product?.attributes.map((attribute) => (
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
                        data.product.id === att.productId &&
                        att.id === attribute.id &&
                        att.value === item.value
                    ) && "active"
                  } 
                  `}
                  style={
                    attribute.name === "Color"
                      ? {
                          background: `${item.value}`,
                        }
                      : null
                  }
                  onClick={() =>
                    setSelectedAttributes(
                      attribute.id,
                      item.value,
                      data.product.id
                    )
                  }
                >
                  {attribute.name === "Color" ? null : item.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;
