import type { TicketStorage } from "../Storage/TicketStorage";
import type { ParkingSpot } from "../types/ParkingSpot";
import type { Ticket } from "../types/TicketTypes";
import type { Vehicle } from "../types/VehicleTypes";
import { v4 as uuidv4 } from "uuid";

export class TicketManager {
  private ticketStorage: TicketStorage;

  constructor(ticketStorage: TicketStorage) {
    this.ticketStorage = ticketStorage;
  }

  issueTicket(
    vehicle: Vehicle,
    parkingSpot: ParkingSpot,
    entryTime: Date,
  ): Ticket {
    const ticket = {
      id: uuidv4(),
      entryTime: entryTime,
      exitTime: null,
      vehicle: vehicle,
      parkingSpot: parkingSpot,
      isClosed: false,
    };
    this.ticketStorage.setTicket(ticket);
    return ticket;
  }

  closeTicket(ticketId: string): boolean {
    const ticket = this.ticketStorage.getTicket(ticketId);
    if (ticket) {
      ticket.isClosed = true;
      this.ticketStorage.setTicket(ticket);
      return true;
    } else {
      return false;
    }
  }

  validateTicket(ticket: Ticket, vehicleLicensePlate: string): boolean {
    const ticketStored = this.ticketStorage.getTicket(ticket.id);
    if (ticketStored) {
      return (
        ticketStored.vehicle.licensePlate === vehicleLicensePlate &&
        !ticketStored.isClosed
      );
    } else {
      return false;
    }
  }

  updateExitTime(ticketId: string, exitTime: Date): boolean {
    const ticket = this.ticketStorage.getTicket(ticketId);
    if (ticket) {
      ticket.exitTime = exitTime;
      this.ticketStorage.setTicket(ticket);
      return true;
    } else {
      return false;
    }
}


}
