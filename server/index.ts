import * as alt from 'alt-server';
import { PluginSystem } from '@AthenaServer/systems/plugins';
import { GarageFunctions } from './src/view';
import './src/garages';
import { GarageSystem } from './src/system';

const PLUGIN_NAME = 'Athena Garages';

PluginSystem.registerPlugin(PLUGIN_NAME, () => {
    GarageSystem.init();
    GarageFunctions.init();
    alt.log(`~lg~${PLUGIN_NAME} was Loaded`);
});
