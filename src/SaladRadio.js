import React from "react";

class SaladRadio extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.ingredient = this.props.ingredient;
        this.cost = this.props.cost;
        this.props.addRadio(this);
        this.checkedRadio = this.props.checkedRadio;
        this.onCheck = this.props.onCheck;
    }
    componentWillReceiveProps(nextProps) {
        this.checkedRadio = nextProps.checkedRadio;
    }


    toggle(){
        this.onCheck(this.ingredient);
    }

    isChecked(){
        return this.state.checked;
    }


    render(){
        return(
            <div className="form-check" key={`${this.ingredient}Div`}>
                <input className="form-check-input" type="radio" name="foundationRadio" value="" key={this.ingredient} checked={this.ingredient === this.checkedRadio} onChange={this.toggle.bind(this)}></input>
                <label className="form-check-label" htmlFor="ingredientRadio">
                {`${this.ingredient} (+${this.cost}kr)`/* Skriver ut namn och pris för en angiven ingrediens */}
                </label>
            </div>
        );
    }
}

export default SaladRadio;