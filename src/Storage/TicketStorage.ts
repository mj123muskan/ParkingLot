import { TicketAdapter } from "../Adapter/TicketAdapter";
import type { Ticket, TicketStorageItem } from "../types/TicketTypes";

export class TicketStorage {

  ticketStorage: Map<string, TicketStorageItem>;

  constructor() {
    this.ticketStorage = new Map();
  }

  setTicket(ticket: Ticket): void {
    this.ticketStorage.set(ticket.id, TicketAdapter.convertTicketToStorageItem(ticket));
  }

  getTicket(id: string): Ticket | null {
    const ticketStorageItem = this.ticketStorage.get(id);
    if(ticketStorageItem){
        return TicketAdapter.convertStorageItemToTicket(ticketStorageItem);
    } else {
      return null; 
    }
  }

  removeTicket(id: string): boolean {
    return this.ticketStorage.delete(id);
  }

}