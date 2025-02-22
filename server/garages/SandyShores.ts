import { VEHICLE_TYPE } from '@AthenaShared/enums/vehicleTypeFlags.js';
import { GarageFunctions } from '../src/view.js';
import IGarage from '@AthenaPlugins/athena-plugin-garage/shared/interfaces/iGarage';

const garage: IGarage = {
    position: { x: 1816.622314453125, y: 3660.156005859375, z: 33.7 },
    types: [VEHICLE_TYPE.CAR],
    index: 'sandy-shores',
    parking: [
        {
            position: {
                x: 1818.896728515625,
                y: 3655.92529296875,
                z: 34.08203125,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.5442129373550415,
            },
        },
        {
            position: {
                x: 1822.3253173828125,
                y: 3657.349365234375,
                z: 34.0146484375,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.5442129373550415,
            },
        },
        {
            position: {
                x: 1825.252685546875,
                y: 3658.997802734375,
                z: 33.997802734375,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.5442129373550415,
            },
        },
        {
            position: {
                x: 1828.4835205078125,
                y: 3660.764892578125,
                z: 33.863037109375,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.49473902583122253,
            },
        },
        {
            position: {
                x: 1831.7010498046875,
                y: 3662.4921875,
                z: 33.863037109375,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.44526514410972595,
            },
        },
        {
            position: {
                x: 1835.182373046875,
                y: 3664.3515625,
                z: 33.7281494140625,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.49473902583122253,
            },
        },
        {
            position: {
                x: 1847.5648193359375,
                y: 3672.06591796875,
                z: 33.6944580078125,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.44526514410972595,
            },
        },
        {
            position: {
                x: 1851.085693359375,
                y: 3673.424072265625,
                z: 33.7449951171875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0.49473902583122253,
            },
        },
    ],
};

GarageFunctions.add(garage);
