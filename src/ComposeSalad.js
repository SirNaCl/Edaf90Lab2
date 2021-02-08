import React from "react";
import Salad from "./Salad"
import SaladCheckbox from "./SaladCheckbox"
import SaladRadioList from "./SaladRadioList"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./styles.css";

class ComposeSalad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checkBoxes: [], radioList: undefined, formErrors: {"foundations": false}};
    this.counter = this.props.counter;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFoundation = this.validateFoundation.bind(this);
  }

  handleSubmit(event){
    // Hindrar eventet att ladda om sidan vid submit
    event.preventDefault();
    this.validateFoundation();

    if(!event.target.checkValidity()){
      event.target.classList.add("was-validated");


      
    }else{
      let salad = this.createSalad();
      this.props.addToCart(salad);
      
      // Återställer salladsskaparen
      document.getElementById("saladForm").reset();
      this.resetOptions();

      this.props.history.push("/viewOrder");
    }
    //Skapar en sallad och skickar upp den i hierarkin så att den kan läggas in i ordern
    
  }


  resetOptions(){
    // Återställer alla objekt som befinner sig i staten
    this.setState(prevState => ({
      checkBoxes: prevState.checkBoxes.map(box=>box.reset()),
      radioList: prevState.radioList.reset()
    }))
  }

  ingredientCheckbox(ingredient){
    const cost = this.props.inventory[ingredient].price;
    return(
      <SaladCheckbox key={ingredient} ingredient={ingredient} cost={cost} addBox={this.addCheckbox.bind(this)}/>
    );
  }

  addCheckbox(box){
    // Lägger in checkboxar i staten för att kunna se deras status
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
    // returnerar en sallad baserat på komponenterna i staten till
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

  foundationWarning(){
    if(this.state.formErrors.foundations){
      return (
      <div className="alert alert-danger" role="alert">
          Du måste välja en bas!
      </div>);
    }
  }

  validateFoundation(){
    let newState = this.state.formErrors;
    if(this.state.radioList.state.checked === undefined && !this.state.formErrors.foundations){
      newState.foundations = true;
      this.setState(prevState => ({
        formErrors: newState
      }));
    }else if(this.state.radioList.state.checked !== undefined && this.state.formErrors.foundations){
      newState.foundations = false;
      this.setState(prevState => ({
        formErrors: newState
      }));
    }
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
      <div style={{margin: "45px"}}>
        <form onSubmit={this.handleSubmit} id="saladForm" noValidate>
          <h4>Välj bas</h4>
          {this.foundationWarning()/* Triggers if no radio has been chosen */}
          <div className="form-group">
            <SaladRadioList ingredients={foundations} inventory={this.props.inventory} addRadioList={this.addRadioList.bind(this)} validate={this.validateFoundation}/>
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
      </div>
    );
  }
}

export default ComposeSalad;
