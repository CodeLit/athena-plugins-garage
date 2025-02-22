import { VEHICLE_TYPE } from '@AthenaShared/enums/vehicleTypeFlags.js';
import { GarageFunctions } from '../src/view.js';
import IGarage from '@AthenaPlugins/athena-plugin-garage/shared/interfaces/iGarage';

const garage: IGarage = {
    position: { x: -773.2252807617188, y: 5530.1611328125, z: 32.9 },
    types: [VEHICLE_TYPE.CAR],
    index: 'paleto-forest',
    parking: [
        {
            position: {
                x: -765.6659545898438,
                y: 5523.7978515625,
                z: 33.4754638671875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.622116804122925,
            },
        },
        {
            position: {
                x: -763.041748046875,
                y: 5526.685546875,
                z: 33.4754638671875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.5726430416107178,
            },
        },
        {
            position: {
                x: -759.982421875,
                y: 5528.50537109375,
                z: 33.4754638671875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.622116804122925,
            },
        },
        {
            position: {
                x: -756.989013671875,
                y: 5530.03515625,
                z: 33.4754638671875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.622116804122925,
            },
        },
        {
            position: {
                x: -753.5736083984375,
                y: 5531.90771484375,
                z: 33.4754638671875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.622116804122925,
            },
        },
        {
            position: {
                x: -750.5538330078125,
                y: 5533.60888671875,
                z: 33.4754638671875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.5726430416107178,
            },
        },
        {
            position: {
                x: -747.085693359375,
                y: 5535.455078125,
                z: 33.4754638671875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.275799512863159,
            },
        },
        {
            position: {
                x: -744.10546875,
                y: 5537.2880859375,
                z: 33.4754638671875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.5231688022613525,
            },
        },
    ],
};

GarageFunctions.add(garage);
