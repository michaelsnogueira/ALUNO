import Order from "../../../domain/checkout/entity/order";
import OrderItem from "../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "../sequelize/model/order-item.model";
import OrderModel from "../sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
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
      include: [{ model: OrderItemModel }],
    });
  }
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customer_id,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );

    for (const item of entity.items) {
      await OrderItemModel.update(
        {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
        },
        {
          where: {
            id: item.id,
          },
        }
      );
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: ["items"],
      });
    } catch (error) {
      throw new Error("Order not found");
    }
    const orderItems = orderModel.items.map((item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
    const order = new Order(id, orderModel.customer_id, orderItems);
    return order;

  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    });
    const orders = orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map((item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
      return new Order(orderModel.id, orderModel.customer_id, orderItems);
    });
    return orders;
  }


}