import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import { GarageFunctions } from './src/view';
import './src/garages';
import { GarageSystem } from './src/system';

const PLUGIN_NAME = 'Athena Garages';

Athena.systems.plugins.registerPlugin(PLUGIN_NAME, () => {
    GarageSystem.init();
    GarageFunctions.init();
    alt.log(`~lg~${PLUGIN_NAME} was Loaded`);
});
