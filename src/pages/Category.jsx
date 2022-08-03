import { Component } from "react";
import "../assets/css/Category.css";
import Spinner from "../components/Spinner";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";

class Category extends Component {
  static contextType = CartContext;

  render() {
    const { currency } = this.context;

    const pathname = window.location.pathname;
    const id = pathname.slice(pathname.lastIndexOf("/") + 1);

    const GET_DATA = gql`
    {
      category (input: { title: ${JSON.stringify(id)} }) {
        name
        products {
          id
          name
          inStock
          gallery
          description
          category
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
    }
  `;

    return (
      <Query query={GET_DATA}>
        {({ error, loading, data }) => {
          if (error) return <h1>Error Something went wrong!</h1>;
          if (loading) return <Spinner />;
          return (
            <div className="main">
              <p className="category-name">{data.category.name}</p>
              <div className="cards">
                {data.category.products.map((product) => (
                  <Link
                    to={product.inStock && `/product/${product.id}`}
                    key={product.id}
                  >
                    <div
                      className={`card ${!product.inStock && "is-not-stock"}`}
                    >
                      <div className="card-img">
                        <img src={product.gallery[0]} alt="card" />
                        {!product.inStock && (
                          <p className="stock-msg">Out of Stock</p>
                        )}
                      </div>
                      <div className="card-content">
                        <p className="card-title">
                          {product.brand + " " + product.name}
                        </p>
                        {product.prices.map(
                          (price) =>
                            price.currency.symbol === currency && (
                              <p
                                className="card-price"
                                key={price.currency.symbol}
                              >
                                {price.currency.symbol + price.amount}
                              </p>
                            )
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Category;
