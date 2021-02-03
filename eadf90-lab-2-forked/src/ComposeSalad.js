import React from "react";

class ComposeSalad extends React.Component {
  render() {
    const inventory = this.props.inventory;
    // test for correct ussage, the parent must send this datastructure
    if (!inventory) {
      alert("inventory is undefined in ComposeSalad");
    }
    let foundations = Object.keys(inventory).filter(
      name => inventory[name].foundation
    );
    return (
      <div className="container">
        <h4>Välj bas</h4>
        <ul>
          {foundations.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ComposeSalad;
