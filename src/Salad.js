class Salad {
    constructor(inventory, id) {
        let items = Object.keys(inventory);
        this.foundations = items.filter(item => inventory[item].foundation);
        this.proteins = items.filter(item => inventory[item].protein);
        this.extras = items.filter(item => inventory[item].extra);
        this.dressings = items.filter(item => inventory[item].dressing);
        this.inventory = inventory;

        this.saladFoundation = undefined;
        this.saladProteins = [];
        this.saladExtras = [];
        this.saladDressings = [];

        this.id = id;
    }

    changeFoundation(foundation) {
        this.saladFoundation = foundation;
        return this;
    };

    removeFoundation() {
        // Should not be used
        this.saladFoundations = undefined;
    };

    addProtein(protein) {
        if (!this.saladProteins.includes(protein)) {
            this.saladProteins.push(protein);
        }
        return this;
    };

    removeProtein(protein) {
        this.saladProteins = this.saladProteins.filter(key => key !== protein);
    };

    addExtra(extra) {
        if (!this.saladExtras.includes(extra)) {
            this.saladExtras.push(extra);
        }
        return this;
    };
    removeExtra(extra) {
        this.saladExtras = this.saladExtras.filter(key => key !== extra);
    };

    addDressing(dressing) {
        if (!this.saladDressings.includes(dressing)) {
            this.saladDressings.push(dressing);
        }
        return this;
    };
    removeDressing(dressing) {
        this.saladDressings = this.saladDressings.filter(key => key !== dressing);
    };

    price() {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let prices = [];

        prices.push(this.inventory[this.saladFoundation].price);
        this.saladProteins.map(ingredient => prices.push(this.inventory[ingredient].price));
        this.saladExtras.map(ingredient => prices.push(this.inventory[ingredient].price));
        this.saladDressings.map(ingredient => prices.push(this.inventory[ingredient].price));

        return prices.reduce(reducer);
    };

    toString() {
        console.log(`Foundation: ${this.saladFoundation}`);
        console.log(`Proteins: ${this.saladProteins}`);
        console.log(`Extras: ${this.saladExtras}`);
        console.log(`Dressings: ${this.saladDressings}`);
    }

    clear() {
        this.saladFoundation = undefined;
        this.saladProteins = [];
        this.saladExtras = [];
        this.saladDressings = [];
    }
}

export default Salad;