export class Address {
  _street: string;
  _number: number;
  _zip: string;
  _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._city = city;
    this._zip = zip;
    this._number = number;
    this.validate();
  }

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