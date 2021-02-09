import React from "react";
import Salad from "./Salad"
import SaladCheckbox from "./SaladCheckbox"
import SaladRadioList from "./SaladRadioList"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./styles.css";
import $ from "jquery"; 

class ComposeSalad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBoxes: [], 
      radioList: undefined, 
      formErrors: {foundations: false,
                   dressings: false}
      };
                   
    this.counter = this.props.counter;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFoundation = this.validateFoundation.bind(this);
    this.validateDressings = this.validateDressings.bind(this);
  }

  handleSubmit(event){
    // Hindrar eventet att ladda om sidan vid submit
    event.preventDefault();
    this.validateFoundation();
    this.validateDressings();

    // Kontrollerar om formen är valid. Om inte så stoppar den submit och visar felmeddelanden
    if(this.state.formErrors.dressings || this.state.formErrors.foundations){
      //event.target.classList.add("was-validated");
      $('#saladForm').children().addClass("was-validated");
      $('#saladForm .requiredCheckboxes').removeClass("was-validated")

    }else{
      let salad = this.createSalad();
      this.props.addToCart(salad);
      
      // Återställer salladsskaparen
      document.getElementById("saladForm").reset();
      this.resetOptions();

      this.props.history.push("/viewOrder");
    }
  }

  resetOptions(){
    // Återställer alla objekt som befinner sig i staten
    this.setState(prevState => ({
      checkBoxes: prevState.checkBoxes.map(box=>box.reset()),
      radioList: prevState.radioList.reset()
    }))
  }

  ingredientCheckbox(ingredient, name, ...rest){
    const cost = this.props.inventory[ingredient].price;
    return(
      <SaladCheckbox key={ingredient} name={name} ingredient={ingredient} cost={cost} addBox={this.addCheckbox.bind(this)} rest={rest}/>
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

  dressingWarning(){
    if(this.state.formErrors.dressings){
      $('div.requiredCheckboxes .form-check').addClass("invalidFeedbackCustom");
      if($('div.requiredCheckboxes .form-check').hasClass("validFeedbackCustom")){
        $('div.requiredCheckboxes .form-check').removeClass("validFeedbackCustom");
      }
      return (
      <div className="alert alert-danger" role="alert">
          Du måste välja minst en dressing!
      </div>);
    }
  }

  /*
    Anropas av radioList när det blir klickad för att bekräfta att den är validerad.
    om det inte har skett någon förändring så görs inget. 
    returns true om den är giltig
    */
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

  returnChangedObject(object, key, value){
    object[key] = value;
    return object;
  }

  validateDressings(){
    //TODO: gör så att fälten blir valid/invalid beroende på resultat.
    if($('div.requiredCheckboxes .form-check :checkbox:checked').length > 0 && this.state.formErrors.dressings){
      this.setState(prevState => ({
        formErrors: this.returnChangedObject(prevState, "dressings", false)
      }));

      $('div.requiredCheckboxes .form-check').addClass("validFeedbackCustom");
      if($('div.requiredCheckboxes .form-check').hasClass("invalidFeedbackCustom")){
        $('div.requiredCheckboxes .form-check').removeClass("invalidFeedbackCustom");
      }

      return true;
    }else if ($('div.requiredCheckboxes .form-check :checkbox:checked').length === 0){
      this.setState(prevState => ({
        formErrors: this.returnChangedObject(prevState, "dressings", true)
      }));
      
      $('div.requiredCheckboxes .form-check').addClass("invalidFeedbackCustom");
      if($('div.requiredCheckboxes .form-check').hasClass("validFeedbackCustom")){
        $('div.requiredCheckboxes .form-check').removeClass("validFeedbackCustom");
      }

      return false;
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
          <div className="form-group">
          {proteins.map(ingr => this.ingredientCheckbox(ingr, "proteins"))}
          <br></br>
          </div>

          <h4>Välj tillbehör</h4>
          <div className="form-group">
          {extras.map(ingr => this.ingredientCheckbox(ingr, "extras"))}
          <br></br>
          </div>
          
          <h4>Välj dressing</h4>
          {this.dressingWarning()}
          <div className="form-group requiredCheckboxes" id="dressingCheckboxes">
          {dressings.map(ingr => this.ingredientCheckbox(ingr, "dressings", {validate: this.validateDressings}))}
          <br></br>
          </div>
          <input type="submit" className="btn btn-primary" value="Lägg till i kundvagn"/>
        </form>
      </div>
    );
  }
}

export default ComposeSalad;
