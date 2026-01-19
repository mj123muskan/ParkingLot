import type { Ticket, TicketStorageItem } from "../types/TicketTypes";

export class TicketAdapter {
  static convertTicketToStorageItem(ticket: Ticket): TicketStorageItem {
    return {
      id: ticket.id,
      entryTime: ticket.entryTime,
      exitTime: ticket.exitTime,
      vehicle: ticket.vehicle,
      parkingSpot: ticket.parkingSpot,
      isClosed: ticket.isClosed
    };
  }

  static convertStorageItemToTicket(storageItem: TicketStorageItem): Ticket {
    return {
      id: storageItem.id,
      entryTime: storageItem.entryTime,
      exitTime: storageItem.exitTime,
      vehicle: storageItem.vehicle,
      parkingSpot: storageItem.parkingSpot,
      isClosed: storageItem.isClosed
    };
  }
}
