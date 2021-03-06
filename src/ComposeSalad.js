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
                   dressings: false},
      noDressingError: true
      };
                   
    this.counter = this.props.counter;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFoundation = this.validateFoundation.bind(this);
    this.validateDressings = this.validateDressings.bind(this);
    this.inventory = this.props.inventory;
    this.dressingError = this.dressingError.bind(this);
    this.setDressingColor = this.setDressingColor.bind(this);
    
    // test for correct ussage, the parent must send this datastructure
    if (!this.inventory) {
      alert("inventory is undefined in ComposeSalad");
    }
    this.foundations = Object.keys(this.inventory).filter(
      name => this.inventory[name].foundation
    );
    this.proteins = Object.keys(this.inventory).filter(item => this.inventory[item].protein);
    this.extras = Object.keys(this.inventory).filter(item => this.inventory[item].extra);
    this.dressings = Object.keys(this.inventory).filter(item => this.inventory[item].dressing);  
  }

  /*
  ########### LAB 2  #############
  */

  resetOptions(){
    // Återställer alla objekt som befinner sig i staten
    this.setState(prevState => ({
      checkBoxes: prevState.checkBoxes.map(box=>box.reset()),
      radioList: prevState.radioList.reset()
    }))
  }

  /**
   * Returnerar ett checkboxelement baserat på angivna properties
   */
  ingredientCheckbox(ingredient, name, ...rest){
    const cost = this.props.inventory[ingredient].price;
    return(
      <SaladCheckbox key={ingredient} name={name} ingredient={ingredient} cost={cost} addBox={this.addCheckbox.bind(this)} rest={rest}/>
    );
  }

  /* 
  Lägger in checkboxar i state för att kunna se deras status 
  */
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


  /** 
  ########### LAB 3 ##############
  */
  handleSubmit(event){
    // Hindrar eventet att ladda om sidan vid submit
    event.preventDefault();
    
    // Kontrollerar om formen är valid. Om inte så stoppar den submit och visar felmeddelanden
    if(this.isFormValid()){
      let salad = this.createSalad();
      this.props.addToCart(salad);
      
      // Återställer salladsskaparen
      document.getElementById("saladForm").reset();
      this.resetOptions();

      this.props.history.push("/viewOrder");

    }else{
      /*  
      TODO: Ger validated-style till elementen i formen. 
      Tas dock bort från checkboxar med speciella krav eftersom de inte kan använda required.
      Deras färg hanteras av valideringsfunktionerna
      */
      $('#saladForm').children().addClass("was-validated");
      console.log(this.state)
      $('#saladForm .requiredCheckboxes').removeClass("was-validated");
      this.setDressingColor();
    }
  }

  /* 
  TODO: Hjälpmetod för att garantera att alla valideringsfunktioner körs 
  */
  isFormValid(){
    let bool1 = this.validateDressings();
    let bool2 = this.validateFoundation();
    return !bool1 && !bool2
  }

  

  //TODO: Returnerar ett JSX element om det ska skrivas ut ett felmeddelande om baser
  foundationWarning(){
    if(this.state.formErrors.foundations){
      return (
      <div className="alert alert-danger" role="alert">
          Du måste välja en bas!
      </div>);
    }
  }

  //TODO: Om det är ett fel i dressingen så ändras färg på texten och en alert skrivs ut
  dressingWarning(){
    if(this.state.formErrors.dressings){
      this.setDressingColor();
      return (
      <div className="alert alert-danger" role="alert">
          Du måste välja minst en dressing!
      </div>);
    }
  }

  /*
    TODO: Anropas av radioList när det blir klickad för att bekräfta att den är validerad.
    om det inte har skett någon förändring så görs inget. 
    returns true om det finns något fel
    */
  validateFoundation(){
    if(this.state.radioList.state.checked === undefined){
      this.setState(prevState => ({
        formErrors: {dressings: prevState.formErrors.dressings, foundations: true}
      }));
      return true;

    }else if(this.state.radioList.state.checked !== undefined){
      this.setState(prevState => ({
        formErrors: {dressings: prevState.formErrors.dressings, foundations: false}
      }));
      return false;
    }
  }

  //TODO: Ändrar färg på dressing div baserat på formError i state
  setDressingColor(){
    if(this.state.formErrors.dressings === true){
      $('div.requiredCheckboxes .form-check').addClass("invalidFeedbackCustom");
      if($('div.requiredCheckboxes .form-check').hasClass("validFeedbackCustom")){
        $('div.requiredCheckboxes .form-check').removeClass("validFeedbackCustom");
      }
    }else if(!this.state.noDressingError){ // Detta kriteriet hindrar text från att bli grön första knapptrycket
      $('div.requiredCheckboxes .form-check').addClass("validFeedbackCustom");
      if($('div.requiredCheckboxes .form-check').hasClass("invalidFeedbackCustom")){
        $('div.requiredCheckboxes .form-check').removeClass("invalidFeedbackCustom");
      }
    }
    
  }

  /**
   TODO:
   * Ändrar värdet på formError.dressing till angiven status
   * Ändrar sedan stilen på texten baserat på statusen
   */
  dressingError(bool){
      this.setState({formErrors: {dressings: bool, foundations: this.state.formErrors.foundations}}, () => this.setDressingColor())
  }
  
  /* 
  TODO: 
  * gör så att fälten blir valid/invalid beroende på resultat. 
  * Kontrollerar längden på den array som skapas då alla "icheckade" rutor väljs
  * returnerar värdet på dressingError
  */
  validateDressings(){
    // Om det finns icheckade rutor
    if($('div.requiredCheckboxes .form-check :checkbox:checked').length > 0){
      // Gör så att det inte är ett formError för dressing
      this.dressingError(false) ;
      return false;

      // Om det inte finns icheckade rutor
    }else if ($('div.requiredCheckboxes .form-check :checkbox:checked').length === 0){
      // Sparar i state att dressings inte är korrekt inmatat
      this.dressingError(true);
      this.setState({noDressingError: false}); // Gör så att texten kan bli grön 
      // Stylar om texten så att användaren ser att det är felaktigt inmatat
      return true;
    }
  }

  render() {
    
    return (
      <div style={{margin: "45px"}}>
        <form onSubmit={this.handleSubmit} id="saladForm" noValidate>
          <h4>Välj bas</h4>
          {this.foundationWarning()/* Triggers if no radio has been chosen */}
          <div className="form-group">
            <SaladRadioList ingredients={this.foundations} inventory={this.props.inventory} addRadioList={this.addRadioList.bind(this)} validate={this.validateFoundation}/>
          <br></br>
          </div>
        
          <h4>Välj protein</h4>
          <div className="form-group">
          {this.proteins.map(ingr => this.ingredientCheckbox(ingr, "proteins"))}
          <br></br>
          </div>

          <h4>Välj tillbehör</h4>
          <div className="form-group">
          {this.extras.map(ingr => this.ingredientCheckbox(ingr, "extras"))}
          <br></br>
          </div>
          
          <h4>Välj dressing</h4>
          {this.dressingWarning()}
          <div className="form-group requiredCheckboxes" id="dressingCheckboxes">
          {this.dressings.map(ingr => this.ingredientCheckbox(ingr, "dressings", {validate: this.validateDressings}))}
          <br></br>
          </div>
          <input type="submit" className="btn btn-primary" value="Lägg till i kundvagn"/>
        </form>
        {console.log(this.state)}
      </div>
    );
  }
}

export default ComposeSalad;
