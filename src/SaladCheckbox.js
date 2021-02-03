import React from "react";

class SaladCheckbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.ingredient = this.props.ingredient;
        this.onChange = this.props.onChange;
        this.cost = this.props.cost;
    }

    render(){
        return(
            <div className="form-check" key={`${this.ingredient}Div`}>
                <input className="form-check-input" type="checkbox" value="" key={this.ingredient} onChange={this.onChange.bind(this,this.ingredient)}></input>
                <label className="form-check-label" htmlFor="ingredientCheckbox">
                {`${this.ingredient} (+${this.cost}kr)`/* Skriver ut namn och pris för en angiven ingrediens */}
                </label>
            </div>
        );
    }
}

export default SaladCheckbox;