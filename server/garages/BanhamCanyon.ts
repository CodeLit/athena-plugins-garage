import { VEHICLE_TYPE } from '@AthenaShared/enums/vehicleTypeFlags.js';
import { GarageFunctions } from '../src/view.js';
import IGarage from '@AthenaPlugins/athena-plugin-garage/shared/interfaces/iGarage';

const garage: IGarage = {
    position: { x: -2954.107666015625, y: 470.46356201171875, z: 14.9 },
    types: [VEHICLE_TYPE.CAR],
    index: 'banham-canyon',
    parking: [
        {
            position: {
                x: -2963.80224609375,
                y: 462.5670471191406,
                z: 15.210205078125,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.671590805053711,
            },
        },
        {
            position: {
                x: -2960.28125,
                y: 462.19781494140625,
                z: 15.210205078125,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.5726430416107178,
            },
        },
        {
            position: {
                x: -2956.839599609375,
                y: 462.26373291015625,
                z: 15.210205078125,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.622116804122925,
            },
        },
        {
            position: {
                x: -2953.028564453125,
                y: 461.23516845703125,
                z: 15.22705078125,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.622116804122925,
            },
        },
        {
            position: {
                x: -2950.0087890625,
                y: 461.98681640625,
                z: 15.193359375,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.622116804122925,
            },
        },
        {
            position: {
                x: -2946.553955078125,
                y: 461.70989990234375,
                z: 15.193359375,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -2.671590805053711,
            },
        },
        {
            position: {
                x: -2938.773681640625,
                y: 467.1033020019531,
                z: 15.193359375,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -1.0389518737792969,
            },
        },
        {
            position: {
                x: -2938.655029296875,
                y: 470.3736267089844,
                z: 15.22705078125,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -1.0389518737792969,
            },
        },
        {
            position: {
                x: -2938.510009765625,
                y: 474.18463134765625,
                z: 15.22705078125,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -1.0389518737792969,
            },
        },
        {
            position: {
                x: -2938.47021484375,
                y: 477.5076904296875,
                z: 15.22705078125,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -1.088425874710083,
            },
        },
        {
            position: {
                x: -2938.07470703125,
                y: 481.1472473144531,
                z: 15.22705078125,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -1.1378997564315796,
            },
        },
    ],
};

GarageFunctions.add(garage);
