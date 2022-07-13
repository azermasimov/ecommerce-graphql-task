import { Component } from "react";
import "../assets/css/CartPageItem.css";
import sliderArrow from "../assets/svg/sliderArrow.svg";

class CartPageItem extends Component {
  render() {
    return (
      <div>
        <div className="cart-page-product-container">
          <div className="product-info">
            <p>Apollo</p>
            <p>Running Short</p>
            <p>$50.00</p>
            <p>Size:</p>
            <div className="sizes">
              <div>xs</div>
              <div className="active">s</div>
              <div>m</div>
              <div>l</div>
            </div>
            <p className="text-color">Color:</p>
            <div className="colors">
              <div className="active"></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div className="count-img-wrapper">
            <div className="count-wrapper">
              <div>+</div>
              <p>{3}</p>
              <div>-</div>
            </div>

            <div className="product-img">
              <img
                src="https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dCUyMHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="product"
              />
              <div className="left">
                <img src={sliderArrow} alt="slider arrow icon" />
              </div>
              <div className="right">
                <img src={sliderArrow} alt="slider arrow icon" />
              </div>
            </div>
          </div>
        </div>
        <div id="bottom-line"></div>
      </div>
    );
  }
}

export default CartPageItem;
