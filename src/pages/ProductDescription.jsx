import { Component } from "react";
import "../assets/css/ProductDescription.css";
import Spinner from "../components/Spinner";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import CartContext from "../context/CartContext";
import ProductAttributes from "../components/ProductAttributes";

class ProductDescription extends Component {
  state = {
    img: "",
    productData: [],
  };

  static contextType = CartContext;

  render() {
    const pathname = window.location.pathname;
    const id = pathname.slice(pathname.lastIndexOf("/") + 1);

    const { currency, sendCartData } = this.context;

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

                  <ProductAttributes data={data} />

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
                      sendCartData(this.state.productData);
                    }}
                    // disabled={
                    //   this.state.productData.some(
                    //     (cartItem) => cartItem.id === data.product.id
                    //   )
                    //     ? true
                    //     : false
                    // }
                  >
                    {/* {" "}
                    {console.log(
                      this.state.productData.some(
                        (cartItem) => cartItem.id === data.product.id
                      )
                        ? true
                        : false
                    )} */}
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
