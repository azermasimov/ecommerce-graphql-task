import { Component } from "react";
import "../assets/css/Navbar.css";
import logo from "../assets/svg/logo.svg";
import cartIcon from "../assets/svg/cartIcon.svg";
import downArrowIcon from "../assets/svg/downArrowIcon.svg";
import CartOverlay from "./CartOverlay";
// import Spinner from "./Spinner";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";

const GET_DATA = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

class Navbar extends Component {
  state = {
    showCurrencies: false,
    showCartOverlay: false,
  };

  static contextType = CartContext;

  render() {
    const { currency, onChangeCurrency } = this.context;

    return (
      <Query query={GET_DATA}>
        {({ data, loading, error }) => {
          if (error) return <h1>Error Something went wrong!</h1>;
          if (loading) return <div></div>;
          return (
            <div className="header">
              <nav className="nav">
                <ul>
                  <li>
                    <Link to="/">All</Link>
                  </li>
                  <li>
                    <Link to="/clothes">Clothes</Link>
                  </li>
                  <li>
                    <Link to="/tech">Tech</Link>
                  </li>
                </ul>
                <div className="logo">
                  <img src={logo} alt="Logo" />
                </div>

                <div className="cart-and-currency-wrapper">
                  <div
                    className="currency"
                    onClick={() =>
                      this.setState({
                        showCurrencies: !this.state.showCurrencies,
                      })
                    }
                  >
                    <p>{currency}</p>
                    <img
                      className={`${
                        this.state.showCurrencies ? "rotate" : null
                      }`}
                      src={downArrowIcon}
                      alt="arrow"
                    />

                    {this.state.showCurrencies && (
                      <div className="select">
                        {data.currencies.map((currency) => (
                          <div
                            className="option"
                            onClick={() =>
                              onChangeCurrency(`${currency.symbol}`)
                            }
                            key={currency.label}
                          >
                            <p>
                              {currency.symbol} {currency.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <img
                    className="cart-icon"
                    src={cartIcon}
                    alt="cart"
                    onClick={() =>
                      this.setState({
                        showCartOverlay: !this.state.showCartOverlay,
                      })
                    }
                  />

                  <CartOverlay showCartOverlay={this.state.showCartOverlay} />
                </div>
              </nav>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Navbar;
