import { Component } from "react";
import "../assets/css/Navbar.css";
import logo from "../assets/svg/logo.svg";
import cartIcon from "../assets/svg/cartIcon.svg";
import downArrowIcon from "../assets/svg/downArrowIcon.svg";
import CartOverlay from "./CartOverlay";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import CartContext from "../Context/CartContext";
import { NavLink } from "react-router-dom";

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
  };

  static contextType = CartContext;

  render() {
    const {
      currency,
      onChangeCurrency,
      orderData,
      showCartOverlay,
      onDisplayCartOverlay,
    } = this.context;
    const { showCurrencies } = this.state;

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
                    <NavLink
                      to="/"
                      className={({ isActive }) => (isActive ? "active" : null)}
                    >
                      All
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/clothes">Clothes</NavLink>
                  </li>
                  <li>
                    <NavLink to="/tech">Tech</NavLink>
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
                        showCurrencies: !showCurrencies,
                      })
                    }
                  >
                    <p>{currency}</p>
                    <img
                      className={`${showCurrencies ? "rotate" : null}`}
                      src={downArrowIcon}
                      alt="arrow"
                    />

                    {showCurrencies && (
                      <div className="select">
                        {data.currencies.map((currency) => (
                          <div
                            className="option"
                            onClick={() =>
                              onChangeCurrency(`${currency.symbol}`)
                            }
                            key={currency.label}
                          >
                            <p>{currency.symbol + " " + currency.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className="cart"
                    onClick={() => onDisplayCartOverlay(showCartOverlay)}
                  >
                    <img className="cart-icon" src={cartIcon} alt="cart" />
                    {orderData.length > 0 && (
                      <div className="items-count">{orderData.length}</div>
                    )}
                  </div>

                  {showCartOverlay && <CartOverlay />}
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
