"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, customer_id, items = []) {
        this._items = [];
        this._total = 0;
        this._id = id;
        this._customer_id = customer_id;
        this._items = items;
        this._total = this.total();
        this.validate();
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }
        if (this._customer_id.length === 0) {
            throw new Error('Customer id is required');
        }
        if (this._items.length === 0) {
            throw new Error('Items is required');
        }
        return true;
    }
    get id() {
        return this._id;
    }
    get customer_id() {
        return this._customer_id;
    }
    get items() {
        return this._items;
    }
    total() {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
}
exports.default = Order;
