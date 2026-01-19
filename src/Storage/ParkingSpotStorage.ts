import { ParkingSpotAdapter } from "../Adapter/ParkingSpotAdapter";
import type {
  ParkingSpot,
  ParkingSpotStatus,
  ParkingSpotStorageItem,
} from "../types/ParkingSpot";

export class ParkingSpotStorage {
  parkingSpotsStorage: Map<string, ParkingSpotStorageItem>;

  constructor() {
    this.parkingSpotsStorage = new Map();
  }

  setParkingSpot(parkingSpot: ParkingSpot): void {
    this.parkingSpotsStorage.set(parkingSpot.id, parkingSpot);
  }

  getParkingSpot(id: string): ParkingSpot | null {
    const parkingSpotStorageItem = this.parkingSpotsStorage.get(id);
    if (parkingSpotStorageItem) {
      return ParkingSpotAdapter.convertStorageItemToParkingSpot(
        parkingSpotStorageItem,
      );
    } else {
      return null;
    }
  }

  removeParkingSpot(id: string): boolean {
    return this.parkingSpotsStorage.delete(id);
  }

  updateParkingSpotStatus(id: string, status: ParkingSpotStatus): boolean {
    const parkingSpotStorageItem = this.parkingSpotsStorage.get(id);

    if (parkingSpotStorageItem) {
      parkingSpotStorageItem.status = status;
      this.parkingSpotsStorage.set(id, parkingSpotStorageItem);
      return true;
    } else {
      return false;
    }
  }

  getParkingSpotsByStatus(status: ParkingSpotStatus): ParkingSpot[] {
    const parkingSpots: ParkingSpot[] = [];
    this.parkingSpotsStorage.forEach((parkingSpotStorageItem) => {
      if (parkingSpotStorageItem.status === status) {
        parkingSpots.push(
          ParkingSpotAdapter.convertStorageItemToParkingSpot(
            parkingSpotStorageItem,
          ),
        );
      }
    });
    return parkingSpots;
  }
}
