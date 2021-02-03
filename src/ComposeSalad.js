import React from "react";
import Salad from "./Salad"
import SaladCheckbox from "./SaladCheckbox"

class ComposeSalad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.counter = this.props.counter;
    this.salad = new Salad(this.props.inventory, this.counter.count());
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleIngredient = this.toggleIngredient.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.addToCart(this.salad);
    this.salad.toString();
    // Återställer salladsskaparen
    document.getElementById("saladForm").reset();
    this.salad = new Salad(this.props.inventory, this.counter.count());
  }

  foundationRadio(foundation){
    // Skapar radio-knappar för baser
    const inventory = this.props.inventory;
    return(
      <div className="form-check" key={`${foundation}Div`}>
          <input className="form-check-input" type="radio" name="foundationRadios"  onChange={this.toggleIngredient.bind(this, foundation)} required></input>
          <label className="form-check-label" htmlFor="exampleRadios1">
            {`${foundation} (+${inventory[foundation].price}kr)` /* Skriver ut namn och kostnad för en angiven bas*/} 
          </label>
      </div>
    );
  }

  ingredientCheckbox(ingredient){
    const cost = this.props.inventory[ingredient].price;
    return(
      <SaladCheckbox ingredient={ingredient} onChange={this.toggleIngredient} cost={cost}/>
    );
  }

  toggleIngredient(ingredient){
    // skicka in namnet på en ingredient och baserat på om den finns eller inte så ändras den i salladen
    // denna anropas av onChange i checkboxarna osv.
    this.salad.toggleIngredient(ingredient);
  }


  render() {
    const inventory = this.props.inventory;
    // test for correct ussage, the parent must send this datastructure
    if (!inventory) {
      alert("inventory is undefined in ComposeSalad");
    }
    let foundations = Object.keys(inventory).filter(
      name => inventory[name].foundation
    );
    let proteins = Object.keys(inventory).filter(item => inventory[item].protein);
    let extras = Object.keys(inventory).filter(item => inventory[item].extra);
    let dressings = Object.keys(inventory).filter(item => inventory[item].dressing);  
    return (
      <form onSubmit={this.handleSubmit} id="saladForm">
        <h4>Välj bas</h4>
        <div className="form-check">
        {foundations.map(found => this.foundationRadio(found))}
        <br></br>
        </div>
      
        <h4>Välj protein</h4>
        <div className="form-check">
        {proteins.map(ingr => this.ingredientCheckbox(ingr))}
        <br></br>
        </div>

        <h4>Välj tillbehör</h4>
        <div className="form-check">
        {extras.map(ingr => this.ingredientCheckbox(ingr))}
        <br></br>
        </div>
        
        <h4>Välj dressing</h4>
        <div className="form-check">
        {dressings.map(ingr => this.ingredientCheckbox(ingr))}
        <br></br>
        </div>
        <input type="submit" className="btn btn-primary" value="Lägg till i kundvagn"/>
      </form>
    );
  }
}

export default ComposeSalad;
