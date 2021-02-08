import React from "react";

class SaladCheckbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {checked: false};
        this.ingredient = this.props.ingredient;
        this.cost = this.props.cost;
        this.props.addBox(this);
       
    }

    toggle(){
        this.setState({checked: !this.state.checked});
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
                <input className="form-check-input" checked={this.state.checked} type="checkbox" value="" onChange={this.toggle.bind(this)}></input>
                <label className="form-check-label" htmlFor="ingredientCheckbox">
                {`${this.ingredient} (+${this.cost}kr)`/* Skriver ut namn och pris för en angiven ingrediens */}
                </label>
            </div>
        );
    }
}

export default SaladCheckbox;