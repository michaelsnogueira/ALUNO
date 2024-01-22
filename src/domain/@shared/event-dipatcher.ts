import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

  private eventHandlers: { [envetName: string]: EventHandlerInterface[] } = {}

  get getEventHandlers(): { [envetName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    const handlers = this.eventHandlers[eventName];
    if (handlers) {
      handlers.forEach(handler => handler.handle(event));
    }
  }
  register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }
  unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    const handlers = this.eventHandlers[eventName];
    if (handlers) {
      this.eventHandlers[eventName] = handlers.filter(handler => handler !== eventHandler);
    }
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }


}