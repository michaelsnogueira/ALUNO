import EventHandlerInterface from "../../../@shared/event-handler.interface";
import CustomerAlterAddressEvent from "../customer-alter-address.event";

export default class EnviaConsoleLog2Handler implements EventHandlerInterface<CustomerAlterAddressEvent> {
  handle(event: CustomerAlterAddressEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.address}`);
  }
}