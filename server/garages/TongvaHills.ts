import { VEHICLE_TYPE } from '@AthenaShared/enums/vehicleTypeFlags.js';
import { GarageFunctions } from '../src/view.js';
import IGarage from '@AthenaPlugins/athena-plugin-garage/shared/interfaces/iGarage';

const garage: IGarage = {
    position: { x: -1892.1685791015625, y: 2039.3367919921875, z: 140.3 },
    types: [VEHICLE_TYPE.CAR],
    index: 'tongva-hills',
    parking: [
        {
            position: {
                x: -1900.0615234375,
                y: 2035.4110107421875,
                z: 140.7244873046875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -0.346317321062088,
            },
        },
        {
            position: {
                x: -1896.03955078125,
                y: 2033.947265625,
                z: 140.7244873046875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -0.346317321062088,
            },
        },
        {
            position: {
                x: -1891.8857421875,
                y: 2032.5362548828125,
                z: 140.7244873046875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -0.3957912027835846,
            },
        },
        {
            position: {
                x: -1887.9560546875,
                y: 2030.901123046875,
                z: 140.7244873046875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -0.346317321062088,
            },
        },
        {
            position: {
                x: -1883.4329833984375,
                y: 2029.3978271484375,
                z: 140.5223388671875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: -0.29684340953826904,
            },
        },
        {
            position: {
                x: -1905.2703857421875,
                y: 2021.3670654296875,
                z: 140.775146484375,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 1.4842170476913452,
            },
        },
        {
            position: {
                x: -1905.4417724609375,
                y: 2017.199951171875,
                z: 140.9267578125,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 1.5336909294128418,
            },
        },
        {
            position: {
                x: -1905.5999755859375,
                y: 2013.072509765625,
                z: 141.22998046875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 1.5336909294128418,
            },
        },
        {
            position: {
                x: -1905.7054443359375,
                y: 2008.7471923828125,
                z: 141.5670166015625,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 1.5831648111343384,
            },
        },
        {
            position: {
                x: -1905.7054443359375,
                y: 2004.7120361328125,
                z: 141.802978515625,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 1.5336909294128418,
            },
        },
        {
            position: {
                x: -1905.5472412109375,
                y: 2000.0703125,
                z: 141.971435546875,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 1.4842170476913452,
            },
        },
    ],
};

GarageFunctions.add(garage);
