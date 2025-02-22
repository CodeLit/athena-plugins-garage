import { VEHICLE_TYPE } from '@AthenaShared/enums/vehicleTypeFlags.js';
import { GarageFunctions } from '../src/view.js';
import IGarage from '@AthenaPlugins/athena-plugin-garage/shared/interfaces/iGarage';

const garage: IGarage = {
    position: { x: -1125.9300537109375, y: -2917.38916015625, z: 13.4 },
    types: [VEHICLE_TYPE.HELI],
    index: 'los-santos-international-air',
    parking: [
        {
            position: {
                x: -1127.7890625,
                y: -2965.437255859375,
                z: 13.9296875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -0.5442129373550415,
            },
        },
        {
            position: {
                x: -1164.5933837890625,
                y: -2942.848388671875,
                z: 13.9296875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -0.5442129373550415,
            },
        },
    ],
};

GarageFunctions.add(garage);
