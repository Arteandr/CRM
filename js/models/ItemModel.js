class ItemModel {
    constructor(o) {
        this.name = o.name;
        this.weight = o.weight;
        this.price = o.price;
        this.costPrice = o.costPrice; // Себестоимость
        this.profit = o.profit;
    }
}

export default ItemModel