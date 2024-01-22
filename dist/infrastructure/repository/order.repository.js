"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../../domain/checkout/entity/order"));
const order_item_1 = __importDefault(require("../../domain/checkout/entity/order_item"));
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
    async update(entity) {
        await order_model_1.default.update({
            customer_id: entity.customer_id,
            total: entity.total(),
        }, {
            where: {
                id: entity.id,
            },
        });
        for (const item of entity.items) {
            await order_item_model_1.default.update({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId,
            }, {
                where: {
                    id: item.id,
                },
            });
        }
    }
    async find(id) {
        let orderModel;
        try {
            orderModel = await order_model_1.default.findOne({
                where: {
                    id,
                },
                rejectOnEmpty: true,
                include: ["items"],
            });
        }
        catch (error) {
            throw new Error("Order not found");
        }
        const orderItems = orderModel.items.map((item) => new order_item_1.default(item.id, item.name, item.price, item.product_id, item.quantity));
        const order = new order_1.default(id, orderModel.customer_id, orderItems);
        return order;
    }
    async findAll() {
        const orderModels = await order_model_1.default.findAll({
            include: ["items"],
        });
        const orders = orderModels.map((orderModel) => {
            const orderItems = orderModel.items.map((item) => new order_item_1.default(item.id, item.name, item.price, item.product_id, item.quantity));
            return new order_1.default(orderModel.id, orderModel.customer_id, orderItems);
        });
        return orders;
    }
}
exports.default = OrderRepository;
