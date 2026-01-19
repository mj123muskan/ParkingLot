import type { ParkingSpotStorage } from "../Storage/ParkingSpotStorage";
import type { VehicleStorage } from "../Storage/VehicleStorage";
import { ParkingSpotStatus, type ParkingSpot } from "../types/ParkingSpot";
import type { Vehicle } from "../types/VehicleTypes";

export class ParkingManager {
  private ParkingSpotStorage: ParkingSpotStorage;
  private VehicleStorage: VehicleStorage;
  private vehicleToParkingSpotMap: Map<string, string>;

  constructor(
    parkingSpotStorage: ParkingSpotStorage,
    vehicleStorage: VehicleStorage,
  ) {
    this.ParkingSpotStorage = parkingSpotStorage;
    this.VehicleStorage = vehicleStorage;
    this.vehicleToParkingSpotMap = new Map();
  }

  findParkingSpotForVehicle(vehicle: Vehicle): ParkingSpot | null {
    const parkingSpots = this.ParkingSpotStorage.getParkingSpotsByStatus(
      ParkingSpotStatus.Free,
    );
    const parkingSpotsForVehicle = parkingSpots.filter((parkingSpot) => {
      return parkingSpot.vehicleSizes.has(vehicle.size);
    });
    if (parkingSpotsForVehicle.length > 0) {
      return parkingSpotsForVehicle[0] ?? null;
    }
    return null;
  }

  parkVehicle(vehicle: Vehicle): ParkingSpot | null {
    const parkingSpot = this.findParkingSpotForVehicle(vehicle);
    if (parkingSpot) {
      parkingSpot.vehicleParked = vehicle;
      parkingSpot.status = ParkingSpotStatus.Reserved;
      this.ParkingSpotStorage.setParkingSpot(parkingSpot);
      this.VehicleStorage.addVehicle(vehicle);
      this.vehicleToParkingSpotMap.set(vehicle.licensePlate, parkingSpot.id);
      return parkingSpot;
    } else {
      return null;
    }
  }

  unparkVehicle(licensePlate: string): boolean {
    const vehicle = this.VehicleStorage.getVehicle(licensePlate);
    if (vehicle) {
      const parkingSpotId = this.vehicleToParkingSpotMap.get(licensePlate);
      if (parkingSpotId) {
        const parkingSpot =
          this.ParkingSpotStorage.getParkingSpot(parkingSpotId);
        if (
          parkingSpot &&
          parkingSpot.vehicleParked?.licensePlate === licensePlate
        ) {
          parkingSpot.vehicleParked = null;
          parkingSpot.status = ParkingSpotStatus.Free;
          this.ParkingSpotStorage.setParkingSpot(parkingSpot);
          this.VehicleStorage.removeVehicle(licensePlate);
          this.vehicleToParkingSpotMap.delete(licensePlate);
          return true;
        }
      }
    } else {
      return false;
    }
    return true;
  }
}
