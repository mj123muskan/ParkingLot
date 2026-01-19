import type { PricingStrategy } from "./PricingStrategy";
import type { Ticket } from "../types/TicketTypes";

export class HourlyPricingStrategy implements PricingStrategy {
  private hourlyRate: number;

  constructor(hourlyRate: number = 20) {
    this.hourlyRate = hourlyRate;
  }

  calculateFare(ticket: Ticket): number {
    if (!ticket.entryTime || !ticket.exitTime) {
      throw new Error("Ticket must have both entry and exit times");
    }
    const entry = ticket.entryTime.getTime();
    const exit = ticket.exitTime.getTime();
    if (exit < entry) {
      throw new Error("Exit time cannot be before entry time");
    }
    const durationMs = exit - entry;
    const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));
    return durationHours * this.hourlyRate;
  }
}
