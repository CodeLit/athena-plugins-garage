import { VEHICLE_TYPE } from '@AthenaShared/enums/vehicleTypeFlags.js';
import { GarageFunctions } from '../src/view.js';
import IGarage from '@AthenaPlugins/athena-plugin-garage/shared/interfaces/iGarage';

const garage: IGarage = {
    position: { x: -1603.747314453125, y: -935.0883178710938, z: 8.2 },
    types: [VEHICLE_TYPE.CAR],
    index: 'del-perro-beach',
    parking: [
        {
            position: { x: -1607.014404296875, y: -933.580810546875, z: 8.7178955078125 },
            rotation: { x: 0, y: 0, z: -0.7051861882209778 },
        },
        {
            position: { x: -1610.610595703125, y: -937.6154174804688, z: 8.629191398620605 },
            rotation: { x: 0, y: 0, z: 2.4624533653259277 },
        },
        {
            position: { x: -1612.9063720703125, y: -935.5880126953125, z: 8.623207092285156 },
            rotation: { x: 0, y: 0, z: 2.4352893829345703 },
        },
        {
            position: { x: -1609.5877685546875, y: -931.786376953125, z: 8.710081100463867 },
            rotation: { x: 0, y: 0, z: -0.6935856938362122 },
        },
        {
            position: { x: -1611.9755859375, y: -930.0770263671875, z: 8.705779075622559 },
            rotation: { x: 0, y: 0, z: -0.6321150660514832 },
        },
        {
            position: { x: -1615.67578125, y: -934.1038818359375, z: 8.609193801879883 },
            rotation: { x: 0, y: 0, z: 2.4239017963409424 },
        },
        {
            position: { x: -1618.2554931640625, y: -931.691650390625, z: 8.613125801086426 },
            rotation: { x: 0, y: 0, z: 2.406479597091675 },
        },
        {
            position: { x: -1614.3206787109375, y: -927.78125, z: 8.710558891296387 },
            rotation: { x: 0, y: 0, z: -0.643389105796814 },
        },
        {
            position: { x: -1616.6920166015625, y: -925.716552734375, z: 8.711285591125488 },
            rotation: { x: 0, y: 0, z: -0.6797670125961304 },
        },
        {
            position: { x: -1620.005615234375, y: -929.70068359375, z: 8.620100975036621 },
            rotation: { x: 0, y: 0, z: 2.3784055709838867 },
        },
    ],
};

GarageFunctions.add(garage);
