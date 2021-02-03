class Counter {
    constructor() {
        this.index = 0;
    }

    count() {
        this.index += 1;
        return this.index;
    }
}

export default Counter;