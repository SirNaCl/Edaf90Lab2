import React from "react";

class ViewOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {order: []};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({order: nextProps.order}); 
    }

    listIngredient(ingredient, salad){
        return(
            <li key={ingredient}>{ingredient}  ({salad.inventory[ingredient].price}kr)</li>
        );
    }

    calcTotalPrice(){
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let prices = [0];
        this.state.order.map(salad => prices.push(salad.price()));
        return prices.reduce(reducer);
    }

    displaySalad(salad){
        return(
            <div key={salad.id} style={{backgroundColor:"lightgray", maxWidth: "150px" }}>
                <h4>Sallad {salad.id}:</h4>
                 <div>
                    <h5>Bas:</h5>
                    <ul>
                        {this.listIngredient(salad.saladFoundation, salad)}
                    </ul>
                </div>
                <div>
                    <h5>Protein:</h5>
                    <ul>
                        {salad.saladProteins.map(ingredient=>this.listIngredient(ingredient, salad))}
                    </ul>
                </div>
                <div>
                    <h5>Tillbehör:</h5>
                    <ul>
                        {salad.saladExtras.map(ingredient=>this.listIngredient(ingredient, salad))}
                    </ul>
                </div>
                <div>
                    <h5>Dressing:</h5>
                    <ul>
                        {salad.saladDressings.map(ingredient=>this.listIngredient(ingredient, salad))}
                    </ul>
                </div>
                <div>
                    <h5>{`Pris: ${salad.price()}kr`}</h5>
                </div>
            </div>
        );
    }

    render(){
        return(
            <div>
                <h2>Din kundvagn:     ({this.calcTotalPrice()}kr)</h2>
                {this.state.order.map(salad=>this.displaySalad(salad))}
            </div>
        );
    }
}

export default ViewOrder;