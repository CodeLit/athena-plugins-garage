import { VEHICLE_TYPE } from '@AthenaShared/enums/vehicleTypeFlags.js';
import { GarageFunctions } from '../src/view.js';
import IGarage from '@AthenaPlugins/athena-plugin-garage/shared/interfaces/iGarage';

const garage: IGarage = {
    position: { x: 638.1083374023438, y: 206.50425720214844, z: 97.1 },
    types: [VEHICLE_TYPE.CAR],
    index: 'downtown-vinewood-upper',
    parking: [
        {
            position: { x: 628.10546875, y: 196.30441284179688, z: 97.22518157958984 },
            rotation: { x: 0, y: 0, z: -1.970790982246399 },
        },
        {
            position: { x: 626.5447387695312, y: 192.6681671142578, z: 97.25752258300781 },
            rotation: { x: 0, y: 0, z: -1.8901821374893188 },
        },
        {
            position: { x: 624.948974609375, y: 188.57269287109375, z: 97.36048126220703 },
            rotation: { x: 0, y: 0, z: -1.9690102338790894 },
        },
        {
            position: { x: 623.661865234375, y: 184.9991455078125, z: 97.43209075927734 },
            rotation: { x: 0, y: 0, z: -1.9761689901351929 },
        },
        {
            position: { x: 622.1517333984375, y: 181.24188232421875, z: 97.44312286376953 },
            rotation: { x: 0, y: 0, z: -2.018047571182251 },
        },
        {
            position: { x: 620.6544799804688, y: 177.16505432128906, z: 97.43790435791016 },
            rotation: { x: 0, y: 0, z: -1.9260358810424805 },
        },
        {
            position: { x: 619.1698608398438, y: 173.0449676513672, z: 97.43238830566406 },
            rotation: { x: 0, y: 0, z: -1.9144991636276245 },
        },
        {
            position: { x: 632.9246826171875, y: 180.1527862548828, z: 96.40357208251953 },
            rotation: { x: 0, y: 0, z: 1.1817524433135986 },
        },
    ],
};
GarageFunctions.add(garage);
