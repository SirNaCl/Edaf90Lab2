import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles.css";
import inventory from "./inventory.ES6";
import ComposeSaladModal from "./ComposeSaladModal";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Counter from "./Counter";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {salads : []};
    this.counter = new Counter();
    this.addToCart = this.addToCart.bind(this);
    this.getSalads = this.getSalads.bind(this);
  }

  addToCart(salad){
    this.setState(prevState => ({
      salads: [...prevState.salads, salad]
    }))
  }

  getSalads(){
    return this.state.salads;
  }

  render() {
    const composeSaladElem = (params) => <ComposeSalad {...params} inventory={inventory} addToCart={this.addToCart} counter={this.counter}/>;
    const viewOrderElem = (params) => <ViewOrder {...params} getSalads={this.getSalads} />

    return (
      <Router>
        <div>
          <div className="jumbotron text-center">
            <h1 className="display-4">Smarriga Salader</h1>
            <p className="lead">
              EDAF90 - Web Programming
            </p>
            <hr className="my-4" />
            <p>Emil Gedenryd & Teodor Ahlinder</p>
          </div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="composeSalad">Komponera din egen sallad</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="viewOrder">Varukorg</Link>
                  </li>
              </ul>
            </nav>
            <Route path="/composeSalad" render={composeSaladElem}/>
            <Route path="/viewOrder" render={viewOrderElem}/>
        </div>    
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
