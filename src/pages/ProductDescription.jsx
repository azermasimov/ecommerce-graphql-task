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
  };

  static contextType = CartContext;

  render() {
    const { img } = this.state;
    const { currency, onAdd } = this.context;

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

                    <ProductAttributes data={data} productId={id} />

                    <p className="price-text">Price:</p>
                    {data.product?.prices.map(
                      (price) =>
                        price.currency?.symbol === currency && (
                          <p key={price.amount} className="price-value">
                            {currency} {price.amount}
                          </p>
                        )
                    )}

                    <button type="button" onClick={() => onAdd(data.product)}>
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
