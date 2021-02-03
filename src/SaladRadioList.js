import React from "react";
import SaladRadio from "./SaladRadio";

class SaladRadioList extends React.Component{
    constructor(props){
        super(props);
        this.state = {checked: "Sallad", radios: []};
        this.ingredients = this.props.ingredients;
        this.inventory = this.props.inventory;
        this.props.addRadioList(this);
    }

    addRadio(radio){
        this.setState(prevState => ({
        radios: [...prevState.radios, radio]
        }));
    }

    reset(){
        this.setState({checked: "Sallad"});
        return this; 
    }

    generateButton(ingredient){
        return (<SaladRadio 
            ingredient={ingredient} 
            cost={this.inventory[ingredient].price} 
            addRadio={this.addRadio.bind(this)} 
            checkedRadio={this.state.checked} 
            onCheck={this.onCheck.bind(this)}/>);
    }

    onCheck(ingredient){
        this.setState({checked: ingredient});
    }



    render(){
        return(
            this.ingredients.map(ingredient=>this.generateButton(ingredient))
        );
    }
}

export default SaladRadioList;