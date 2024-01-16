"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
class Address {
    constructor(street, number, zip, city) {
        this._street = street;
        this._city = city;
        this._zip = zip;
        this._number = number;
        this.validate();
    }
    get street() { return this._street; }
    get number() { return this._number; }
    get zip() { return this._zip; }
    get city() { return this._city; }
    validate() {
        if (this._street.length < 3) {
            throw new Error('Street must be at least 3 characters long');
        }
        if (this._city.length < 3) {
            throw new Error('City must be at least 3 characters long');
        }
        if (this._zip.length < 3) {
            throw new Error('Zip must be at least 3 characters long');
        }
    }
    toString() {
        return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
    }
}
exports.Address = Address;
