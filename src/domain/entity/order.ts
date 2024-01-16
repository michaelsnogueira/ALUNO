import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customer_id: string;
  private _items: OrderItem[] = [];
  private _total: number = 0;

  constructor(id: string, customer_id: string, items: OrderItem[] = []) {
    this._id = id;
    this._customer_id = customer_id;
    this._items = items;
    this._total = this.total();
    this.validate();
  }
  validate(): boolean {
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

  get id(): string {
    return this._id;
  }

  get customer_id(): string {
    return this._customer_id;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }

}