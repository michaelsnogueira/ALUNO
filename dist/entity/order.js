"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, customer_id, items = []) {
        this._items = [];
        this._id = id;
        this._customer_id = customer_id;
        this._items = items;
    }
    total() {
        return this._items.reduce((sum, item) => sum + item._price, 0);
    }
}
exports.default = Order;
