import { VehicleAdapter } from "../Adapter/VehicleAdapter";
import type { VehicleStorageItem, Vehicle } from "../types/VehicleTypes";

export class VehicleStorage {
  //license Plate vs VehicleStorageItem
  vehicleStorage: Map<string, VehicleStorageItem>;

  constructor() {
    this.vehicleStorage = new Map();
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicleStorage.set(
      vehicle.licensePlate,
      VehicleAdapter.convertVehicleToStorageItem(vehicle),
    );
  }

  removeVehicle(licensePlate: string) {
    this.vehicleStorage.delete(licensePlate);
  }

  getVehicle(licensePlate: string): Vehicle | null {
    const vehicleStorageItem = this.vehicleStorage.get(licensePlate);
    if (vehicleStorageItem) {
      return VehicleAdapter.convertStorageItemToVehicle(vehicleStorageItem);
    } else {
      return null;
    }
  }
}
