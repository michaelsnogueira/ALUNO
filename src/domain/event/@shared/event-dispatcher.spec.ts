import Product from "../../entity/product";
import CustomerAlterAddressEvent from "../customer/customer-alter-address.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import EnviaConsoleLog1Handler from "../customer/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../customer/handler/envia-console-log2.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dipatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });
  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });
  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });
  it("should notify an event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      price: 9.99,
      description: "Product 1 description"
    });


    eventDispatcher.notify(productCreatedEvent);

    expect(eventHandlerSpy).toHaveBeenCalledTimes(1);
  });
  it("should notify an event with multiple handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new SendEmailWhenProductIsCreatedHandler();
    const eventHandler2 = new EnviaConsoleLog1Handler();
    const eventHandler3 = new EnviaConsoleLog2Handler();

    const eventHandlerSpy1 = jest.spyOn(eventHandler1, "handle");
    const eventHandlerSpy2 = jest.spyOn(eventHandler2, "handle");
    const eventHandlerSpy3 = jest.spyOn(eventHandler3, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    eventDispatcher.register("CustomerAlterAddressEvent", eventHandler3);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerAlterAddressEvent"][0]).toMatchObject(eventHandler3);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      price: 9.99,
      description: "Product 1 description"
    });

    eventDispatcher.notify(productCreatedEvent);
    expect(eventHandlerSpy1).toHaveBeenCalledTimes(1);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: 1,
      nome: "Customer 1",
      address: "Customer 1 address"
    });
    eventDispatcher.notify(customerCreatedEvent);
    expect(eventHandlerSpy2).toHaveBeenCalledTimes(1);

    const customerAlterAddressEvent = new CustomerAlterAddressEvent({
      id: 1,
      nome: "Customer 1",
      address: "Customer 1 address alterado"
    });
    eventDispatcher.notify(customerAlterAddressEvent);
    expect(eventHandlerSpy3).toHaveBeenCalledTimes(1);


  });
});