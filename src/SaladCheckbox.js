import React from "react";

class SaladCheckbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {checked: false};
        this.ingredient = this.props.ingredient;
        this.cost = this.props.cost;
        this.rest = this.props.rest;
        this.name = this.props.name;
        this.toggle = this.toggle.bind(this); 
        this.validator = function(){};
        this.validator = this.validator.bind(this);
        
        /**
         TODO: Undersöker om det finns en valideringsfunktion angiven
                Skriver över den tomma ovan om så är fallet
         */
        this.restObjects = [];
        this.rest.map(opt=>typeof opt === "object"? this.restObjects.push(opt) : "");
        this.restObjects.map(obj=>obj["validate"]!=="undefined"? this.validator = obj.validate : "");
        
        this.props.addBox(this);
    }

    toggle(){
        this.setState({checked: !this.state.checked});
       
        //TODO: Anropar angiven valideringsfunktion, annars anrop av tom funktion
        this.validator()
        
    }

    isChecked(){
        return this.state.checked;
    }

    reset(){
         this.setState({checked: false});
         return this;
    }

    render(){
        return(
           <div className="form-check" key={`${this.ingredient}Div`}>
                <input 
                className="form-check-input" 
                name={this.name}
                checked={this.state.checked} 
                type="checkbox"  
                onChange={this.toggle}
                ></input>
                <label className="form-check-label" htmlFor="ingredientCheckbox">
                {`${this.ingredient} (+${this.cost}kr)`/* Skriver ut namn och pris för en angiven ingrediens */}
                </label>
            </div>
        );
    }
}

export default SaladCheckbox;