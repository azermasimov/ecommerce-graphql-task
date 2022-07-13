import { Component } from "react";
import "../assets/css/Spinner.css";

class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <div className="loader"></div>
      </div>
    );
  }
}

export default Spinner;
