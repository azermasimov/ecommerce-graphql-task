import { Component } from "react";
import "../assets/css/ProductDescription.css";
import Spinner from "../components/Spinner";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import CartContext from "../Context/CartContext";

class ProductDescription extends Component {
  state = {
    img: "",
    productData: [],
    attributes: [],
  };

  static contextType = CartContext;

  render() {
    console.log(this.state.attributes);

    const pathname = window.location.pathname;
    const id = pathname.slice(pathname.lastIndexOf("/") + 1);

    const { currency, cartData, handleOrderDetails, sendCartData } =
      this.context;

    const GET_DATA = gql`
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
      <Query query={GET_DATA}>
        {({ error, loading, data }) => {
          if (error) return <h1>Error Something went wrong!</h1>;
          if (loading) return <Spinner />;
          return (
            <>
              <div className="description-container">
                <div className="imgs-wrapper">
                  {data.product.gallery.map((img) => (
                    <img
                      key={img}
                      src={img}
                      alt="product"
                      onLoad={() =>
                        this.setState({ img: data.product.gallery[0] })
                      }
                      onClick={() =>
                        this.setState({
                          img: img,
                        })
                      }
                    />
                  ))}
                </div>

                <div className="selected-img">
                  <img src={this.state.img} alt="product" />
                </div>

                <div className="info-wrapper">
                  <p className="brand">{data.product.brand}</p>
                  <p className="name">{data.product.name}</p>
                  <div className="attributes">
                    {data.product.attributes.map((attribute) => (
                      <div className="attribute" key={attribute.id}>
                        <p className="name">{attribute.name}:</p>
                        <div className="values">
                          {attribute.items.map((item) => (
                            <div
                              key={item.id}
                              className={`value ${
                                attribute.name === "Color" && "color-square"
                              } ${
                                this.state.attributes.some(
                                  (att) =>
                                    att.id === attribute.id &&
                                    att.value === item.value
                                ) && "active"
                              }`}
                              style={
                                attribute.name === "Color"
                                  ? {
                                      background: `${item.value}`,
                                    }
                                  : null
                              }
                              onClick={() => {
                                this.setState({
                                  attributes: [
                                    ...this.state.attributes,
                                    {
                                      id: attribute.id,
                                      value: item.value,
                                    },
                                  ],
                                });
                              }}
                            >
                              {attribute.name === "Color" ? null : item.value}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="price-text">Price:</p>
                  {data.product.prices.map(
                    (price) =>
                      price.currency.symbol === currency && (
                        <p key={price.amount} className="price-value">
                          {currency} {price.amount}
                        </p>
                      )
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      this.setState({
                        productData: [...this.state.productData, data.product],
                      });
                      sendCartData(
                        this.state.productData,
                        this.state.attributes
                      );
                    }}
                  >
                    Add to cart
                  </button>

                  {data.product.description && (
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: `${data.product.description}`,
                      }}
                    />
                  )}
                </div>
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}

export default ProductDescription;
