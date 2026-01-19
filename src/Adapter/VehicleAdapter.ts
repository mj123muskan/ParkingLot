import { Car, Motorcycle, Truck, VehicleType, type Vehicle, type VehicleStorageItem } from "../types/VehicleTypes";

export class VehicleAdapter {

    static convertVehicleToStorageItem(vehicle: Vehicle): VehicleStorageItem {
        return {
            id: vehicle.id,
            licensePlate: vehicle.licensePlate,
            size: vehicle.size,
            type: vehicle.type
        }
    }

    static convertStorageItemToVehicle(storageItem: VehicleStorageItem): Vehicle | null {
        switch (storageItem.type) {
            case VehicleType.Car:
                return new Car(storageItem.licensePlate, storageItem.id, );
            case VehicleType.Motorcycle:
                return new Motorcycle(storageItem.licensePlate, storageItem.id, );
            case VehicleType.Truck:
                return new Truck(storageItem.licensePlate, storageItem.id); 
            default:
                return null;
        }
    }

    static getVehicleFromTypeAndLicensePlate(vehicleType: VehicleType, licensePlate: string): Vehicle | null {
        switch (vehicleType) {
            case VehicleType.Car:
                return new Car(licensePlate);
            case VehicleType.Motorcycle:
                return new Motorcycle(licensePlate);
            case VehicleType.Truck:
                return new Truck(licensePlate); 
            default:
                return null;
        }
    }


}