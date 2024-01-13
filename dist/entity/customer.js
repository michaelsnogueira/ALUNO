"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._active = true;
        this._id = id;
        this._name = name;
        this.validate();
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    activate() {
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    validate() {
        if (this._name.length < 3) {
            throw new Error('Name must be at least 3 characters long');
        }
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }
        if (this._address === undefined) {
            throw new Error('Address is required');
        }
    }
    set address(address) {
        this._address = address;
    }
}
exports.default = Customer;
