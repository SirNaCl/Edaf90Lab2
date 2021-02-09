import React from "react";
import SaladRadio from "./SaladRadio";

class SaladRadioList extends React.Component{

    constructor(props){
        super(props);
        this.state = {checked: undefined, radios: [], clicked: false};
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
        this.setState({checked: undefined});
        return this; 
    }

    generateButton(ingredient){
        return (<SaladRadio 
            key={ingredient}
            ingredient={ingredient} 
            cost={this.inventory[ingredient].price} 
            addRadio={this.addRadio.bind(this)} 
            checkedRadio={this.state.checked} 
            onCheck={this.onCheck.bind(this)}
            />
            );
    }

    //TODO: Ny validering. Anropas när en radio blir vald. Anropar ComposeSalad.validateFoundation()
    onCheck(event){
        this.setState({checked: event.target.value}, () => this.props.validate()); 
    }

    render(){
        return(
            <div className="form-group">
                {this.ingredients.map(ingredient=>this.generateButton(ingredient))}
            </div>
        );
    }
}

export default SaladRadioList;