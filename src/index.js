import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery"; // skip this if you do not use bootstrap modals
import Popper from "popper.js"; // skip this if you do not use bootstrap modals

import "./styles.css";
import inventory from "./inventory.ES6";
import ComposeSaladModal from "./ComposeSaladModal";
import ViewOrder from "./ViewOrder";
import Counter from "./Counter";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {salads : []};
    this.counter = new Counter();
  }

  addToCart(salad){
    this.setState(prevState => ({
      salads: [...prevState.salads, salad]
    }))
  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-4">Smarriga Salader</h1>
          <p className="lead">
            EDAF90 - Web Programming
          </p>
          <hr className="my-4" />
          <p>Emil Gedenryd & Teodor Ahlinder</p>
        </div>
        <div style={{margin: "25px"}}>
          {/*Skapar en modal där användaren kan sätta ihop en sallad*/}
          <ComposeSaladModal inventory={inventory} addToCart={this.addToCart.bind(this)} counter={this.counter}/>{/**in i salad */}
        </div>
        <div style={{margin: "25px"}}>
          {/*Listar ut alla sallader som finns i ordern*/}
          <ViewOrder order={this.state.salads} />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
