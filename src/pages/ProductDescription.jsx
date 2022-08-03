import { Component } from "react";
import "../assets/css/ProductDescription.css";
import Spinner from "../components/Spinner";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import CartContext from "../context/CartContext";

class ProductDescription extends Component {
  state = {
    img: "",
  };

  static contextType = CartContext;

  render() {
    const { img } = this.state;
    const { currency, onAdd, selectedAttributes, onSelectAttributes } =
      this.context;

    const pathname = window.location.pathname;
    const id = pathname.slice(pathname.lastIndexOf("/") + 1);

    const PRODUCT_DATA = gql`
    {
      product(id: ${JSON.stringify(id)}) {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
    `;

    return (
      <Query query={PRODUCT_DATA}>
        {({ data, loading, error }) => {
          if (error) return <h1>Error Something went wrong!</h1>;
          if (loading) return <Spinner />;
          return (
            <>
              {
                <div className="description-container">
                  <div className="imgs-wrapper">
                    {data.product?.gallery.map((img) => (
                      <img
                        key={img}
                        src={img}
                        alt="product"
                        onLoad={() =>
                          this.setState({ img: data.product.gallery[0] })
                        }
                        onClick={() =>
                          this.setState({
                            img,
                          })
                        }
                      />
                    ))}
                  </div>

                  <div className="selected-img">
                    <img src={img} alt="product" />
                  </div>

                  <div className="info-wrapper">
                    <p className="brand">{data.product?.brand}</p>
                    <p className="name">{data.product?.name}</p>

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
                                    (x) =>
                                      x.attributeId === attribute.id &&
                                      x.id === item.id
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
                                  onSelectAttributes(attribute.id, item)
                                }
                              >
                                {attribute.name === "Color" ? null : item.value}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="price-text">Price:</p>

                    {data.product?.prices.map(
                      (price) =>
                        price.currency?.symbol === currency && (
                          <p key={price.amount} className="price-value">
                            {currency} {price.amount}
                          </p>
                        )
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        onAdd(data.product, this.state.selectedAttributes)
                      }
                    >
                      Add to cart
                    </button>

                    {data.product?.description && (
                      <div
                        className="description"
                        dangerouslySetInnerHTML={{
                          __html: `${data.product?.description}`,
                        }}
                      />
                    )}
                  </div>
                </div>
              }
            </>
          );
        }}
      </Query>
    );
  }
}

export default ProductDescription;
