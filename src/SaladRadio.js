import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./styles.css";

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


    toggle(event){
        this.onCheck(event);
    }

    isChecked(){
        return this.state.checked;
    }


    render(){
        return(
            <div className="form-check">
                <input required 
                className="form-check-input" 
                type="radio" 
                name="foundationRadio" 
                value={this.ingredient} 
                key={this.ingredient} 
                checked={this.ingredient === this.checkedRadio} 
                onChange={this.toggle.bind(this)}>         
                </input>
                <label className="form-check-label" htmlFor="foundationRadio">
                    {`${this.ingredient} (+${this.cost}kr)`}
                </label>
            </div>
           
        );
    }
}

export default SaladRadio;