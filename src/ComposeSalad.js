import React from "react";
import Salad from "./Salad"
import SaladCheckbox from "./SaladCheckbox"
import SaladRadioList from "./SaladRadioList"

class ComposeSalad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checkBoxes: [], radioList: undefined};
    this.counter = this.props.counter;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createSalad = this.createSalad.bind(this);
    this.setState = this.setState.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    
    let salad = this.createSalad();
    this.props.addToCart(salad);
    // Återställer salladsskaparen
    document.getElementById("saladForm").reset();
    this.resetOptions();
  }

  resetOptions(){
    this.setState(prevState => ({
      checkBoxes: prevState.checkBoxes.map(box=>box.reset()),
      radioList: prevState.radioList.reset()
    }))
  }




  ingredientCheckbox(ingredient){
    const cost = this.props.inventory[ingredient].price;
    return(
      <SaladCheckbox ingredient={ingredient} cost={cost} addBox={this.addCheckbox.bind(this)}/>
    );
  }

  addCheckbox(box){
    this.setState(prevState => ({
      checkBoxes: [...prevState.checkBoxes, box]
    }))
  }

  addRadioList(rl){
    this.setState({radioList: rl});
  }


  checkedBoxes(){
    return this.state.checkBoxes.filter(box=>box.isChecked());
  }

  checkedRadio(){
    return this.state.radioList.state.checked;
  }

  ingredientsFromBoxes(boxes){
    let ingredients = [];
    boxes.map(box=>ingredients.push(box.ingredient));
    return ingredients;
  }


  createSalad(){
    const inventory = this.props.inventory;
    let proteins = Object.keys(inventory).filter(item => inventory[item].protein);
    let extras = Object.keys(inventory).filter(item => inventory[item].extra);
    let dressings = Object.keys(inventory).filter(item => inventory[item].dressing);  
    let salad = new Salad(inventory, this.counter.count());
    let checkedB = this.checkedBoxes();
    let ingredients = this.ingredientsFromBoxes(checkedB);
    let foundation= this.checkedRadio();

    salad.changeFoundation(foundation);
    ingredients.filter(ingredient=>proteins.includes(ingredient)).map(ingredient=>salad.addProtein(ingredient));
    ingredients.filter(ingredient=>extras.includes(ingredient)).map(ingredient=>salad.addExtra(ingredient));
    ingredients.filter(ingredient=>dressings.includes(ingredient)).map(ingredient=>salad.addDressing(ingredient));

    salad.toString();
    return salad;
  }



  // toggleIngredient(ingredient){
  //   // skicka in namnet på en ingredient och baserat på om den finns eller inte så ändras den i salladen
  //   // denna anropas av onChange i checkboxarna osv.
  //   this.salad.toggleIngredient(ingredient);
  // }


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
          <SaladRadioList ingredients={foundations} inventory={this.props.inventory} addRadioList={this.addRadioList.bind(this)}/>
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
