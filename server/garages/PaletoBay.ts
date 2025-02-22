import { VEHICLE_TYPE } from '@AthenaShared/enums/vehicleTypeFlags.js';
import { GarageFunctions } from '../src/view.js';
import IGarage from '@AthenaPlugins/athena-plugin-garage/shared/interfaces/iGarage';

const garage: IGarage = {
    position: { x: -20.12179183959961, y: 6311.2998046875, z: 30.8 },
    types: [VEHICLE_TYPE.CAR],
    index: 'paleto-bay',
    parking: [
        {
            position: {
                x: -19.85934066772461,
                y: 6321.89013671875,
                z: 31.217529296875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.49473902583122253,
            },
        },
        {
            position: {
                x: -16.602195739746094,
                y: 6324.0791015625,
                z: 31.217529296875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.5442129373550415,
            },
        },
        {
            position: {
                x: -14.017581939697266,
                y: 6326.95361328125,
                z: 31.217529296875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.5442129373550415,
            },
        },
        {
            position: {
                x: -11.221977233886719,
                y: 6329.72314453125,
                z: 31.217529296875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.5936868190765381,
            },
        },
        {
            position: {
                x: -8.5054931640625,
                y: 6332.63720703125,
                z: 31.217529296875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.5936868190765381,
            },
        },
        {
            position: {
                x: -5.472526550292969,
                y: 6335.19580078125,
                z: 31.217529296875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.5442129373550415,
            },
        },
        {
            position: {
                x: -2.821979522705078,
                y: 6337.95166015625,
                z: 31.217529296875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.5442129373550415,
            },
        },
        {
            position: {
                x: -0.21099090576171875,
                y: 6340.87890625,
                z: 31.217529296875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.5442129373550415,
            },
        },
    ],
};

GarageFunctions.add(garage);
