import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';


export class GarageSystem {
    static init() {
        Athena.events.vehicle.on("vehicle-destroyed", GarageSystem.handleDestroy);
    }

    static async handleDestroy(vehicle: alt.Vehicle) {
        if (!vehicle || !vehicle.id) {
            return;
        }

        await Athena.vehicle.controls.update(vehicle);
    }
}
