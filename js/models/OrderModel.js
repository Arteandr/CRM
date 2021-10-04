class OrderModel {
    constructor(o) {
        this.text = o.text;
        this.src = o.src;
        this.date = o.date;
        this.time = o.time;
        this.needed = o.needed;
        this.to = o.to;
        this.code = o.code;
        this.status = o.status;
        this.address = o.address;
        this.comments = o.comments;
        this.items = o.items;
        this.deliveryPrice = o.deliveryPrice;
        this.price = o.price;
        this.manager = o.manager
    }
}

export default OrderModel;