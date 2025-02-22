import { VEHICLE_TYPE } from '@AthenaShared/enums/vehicleTypeFlags.js';
import { GarageFunctions } from '../src/view.js';
import IGarage from '@AthenaPlugins/athena-plugin-garage/shared/interfaces/iGarage';

const garage: IGarage = {
    position: { x: -709.9341430664062, y: -1289.7662353515625, z: 4.6 },
    types: [VEHICLE_TYPE.CAR],
    index: 'la-puerta-vehicle',
    parking: [
        {
            position: { x: -717.6643676757812, y: -1291.495361328125, z: 5.000385761260986 },
            rotation: { x: 0, y: 0, z: 0.8654646873474121 },
        },
        {
            position: { x: -719.9657592773438, y: -1294.08203125, z: 5.000385761260986 },
            rotation: { x: 0, y: 0, z: 0.8863080739974976 },
        },
        {
            position: { x: -722.2251586914062, y: -1296.6856689453125, z: 5.000385761260986 },
            rotation: { x: 0, y: 0, z: 0.8901116847991943 },
        },
        {
            position: { x: -724.2575073242188, y: -1299.0037841796875, z: 5.000385284423828 },
            rotation: { x: 0, y: 0, z: 0.8609938025474548 },
        },
        {
            position: { x: -705.1185302734375, y: -1278.3687744140625, z: 5.00037956237793 },
            rotation: { x: 0, y: 0, z: 2.4697327613830566 },
        },
        {
            position: { x: -707.535888671875, y: -1276.168701171875, z: 5.00037956237793 },
            rotation: { x: 0, y: 0, z: 2.4007668495178223 },
        },
        {
            position: { x: -710.0106811523438, y: -1273.9967041015625, z: 5.00037956237793 },
            rotation: { x: 0, y: 0, z: 2.4046735763549805 },
        },
        {
            position: { x: -712.5017700195312, y: -1271.8580322265625, z: 5.00037956237793 },
            rotation: { x: 0, y: 0, z: 2.380303382873535 },
        },
    ],
};

GarageFunctions.add(garage);
