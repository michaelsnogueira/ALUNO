"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(id, name, price, productId, quantity) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this.validate();
    }
    get price() {
        return this._price;
    }
    validate() {
        if (this._quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }
        if (this._name.length === 0) {
            throw new Error('Name is required');
        }
        if (this._price <= 0) {
            throw new Error('Price must be greater than 0');
        }
        return true;
    }
    get id() {
        return this._id;
    }
    get productId() {
        return this._productId;
    }
    get name() {
        return this._name;
    }
    get quantity() {
        return this._quantity;
    }
    orderItemTotal() {
        return this._price * this._quantity;
    }
}
exports.default = OrderItem;
