import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api/index.js';
import { GarageFunctions } from './src/view.js';
import './src/garages.js';
import { GarageSystem } from './src/system.js';

const PLUGIN_NAME = 'Athena Garages';

Athena.systems.plugins.registerPlugin(PLUGIN_NAME, () => {
    GarageSystem.init();
    GarageFunctions.init();
    alt.log(`~lg~${PLUGIN_NAME} was Loaded`);
});
