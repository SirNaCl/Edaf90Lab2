import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery"; // skip this if you do not use bootstrap modals
import Popper from "popper.js"; // skip this if you do not use bootstrap modals

import "./styles.css";
import inventory from "./inventory.ES6";
import ComposeSalad from "./ComposeSalad";
import ComposeSaladModal from "./ComposeSaladModal";

class App extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-4">EDAF90 - Web Programming</h1>
          <p className="lead">
            This is a template project for react + router + bootstrap.
          </p>
          <hr className="my-4" />
          <p>This code is a good starting point for lab 2.</p>
        </div>

        <ComposeSaladModal inventory={inventory} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
