import * as alt from 'alt-server';
import { Athena } from '@AthenaServer/api/athena';
import { ATHENA_EVENTS_VEHICLE } from '@AthenaShared/enums/athenaEvents';

export class GarageSystem {
    static init() {
        Athena.events.vehicle.on(ATHENA_EVENTS_VEHICLE.DESTROYED, GarageSystem.handleDestroy);
    }

    static handleDestroy(vehicle: alt.Vehicle) {
        if (!vehicle || !vehicle.data) {
            return;
        }

        Athena.vehicle.funcs.save(vehicle, { garageIndex: null, position: { x: 0, y: 0, z: 0 } });
    }
}
