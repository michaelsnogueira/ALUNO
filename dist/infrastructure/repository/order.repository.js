"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_item_model_1 = __importDefault(require("../db/sequelize/model/order-item.model"));
const order_model_1 = __importDefault(require("../db/sequelize/model/order.model"));
class OrderRepository {
    async create(entity) {
        await order_model_1.default.create({
            id: entity.id,
            customer_id: entity.customer_id,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId,
            })),
        }, {
            include: [{ model: order_item_model_1.default }],
        });
    }
    update(entity) {
        throw new Error("Method not implemented.");
    }
    find(id) {
        throw new Error("Method not implemented.");
    }
    findAll() {
        throw new Error("Method not implemented.");
    }
}
exports.default = OrderRepository;
