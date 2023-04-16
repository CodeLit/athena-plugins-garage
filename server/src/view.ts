import * as alt from 'alt-server';

import { GARAGE_INTERACTIONS } from '../../shared/events';
import { LOCALE_GARAGE_FUNCS } from '../../shared/locales';
import { isVehicleType } from '@AthenaShared/enums/vehicleTypeFlags';
import { VehicleData } from '@AthenaShared/information/vehicles';
import { OwnedVehicle } from '@AthenaShared/interfaces/vehicleOwned';
import { LOCALE_KEYS } from '@AthenaShared/locale/languages/keys';
import { LocaleController } from '@AthenaShared/locale/locale';
import * as Athena from '@AthenaServer/api';
import { GarageSpaceShape } from '@AthenaServer/extensions/extColshape';
import IGarage from '@AthenaPlugins/athena-plugin-garage/shared/interfaces/iGarage';

const PARKING_SPACE_DIST_LIMIT = 5;
const GarageUsers = {};
const LastParkedCarSpawn: { [key: string]: alt.Vehicle } = {};
const VehicleCache: { [id: string]: Array<OwnedVehicle> } = {};

let activeGarages: Array<IGarage> = [];
let parkingSpots: { [key: string]: Array<GarageSpaceShape> } = {};

interface PositionAndRotation {
    position: alt.IVector3;
    rotation: alt.IVector3;
}

export class GarageFunctions {
    static init() {
        alt.onClient(GARAGE_INTERACTIONS.SPAWN, GarageFunctions.spawnVehicle);
        alt.onClient(GARAGE_INTERACTIONS.DESPAWN, GarageFunctions.despawnVehicle);

        //TODO Replace event names with enum
        alt.on('entityEnterColshape', GarageFunctions.entityEnterColshape);
        alt.on('entityLeaveColshape', GarageFunctions.entityLeaveColshape);
    }

    static entityEnterColshape(colshape: alt.Colshape | GarageSpaceShape, entity: alt.Entity) {
        if (!(entity instanceof alt.Vehicle)) {
            return;
        }

        if (!(colshape instanceof GarageSpaceShape)) {
            return;
        }

        colshape.setSpaceStatus(false);
    }

    static entityLeaveColshape(colshape: alt.Colshape | GarageSpaceShape, entity: alt.Entity) {
        if (!(entity instanceof alt.Vehicle)) {
            return;
        }

        if (!(colshape instanceof GarageSpaceShape)) {
            return;
        }

        colshape.setSpaceStatus(true);
    }

    /**
     * Add a garage to the garage system
     * @static
     * @param {IGarage} garage
     * @param {boolean} isInit Leave as false if adding
     * @memberof GarageFunctions
     */
    static async add(garage: IGarage) {
        alt.log(`~g~Registered Garage - ${garage.index}`);

        //FIXME: This is a temporary fix for the garage types.
        const properTypeName = garage.types[0].charAt(0).toUpperCase() + garage.types[0].slice(1);

        Athena.controllers.interaction.append({
            position: garage.position,
            description: `${LOCALE_GARAGE_FUNCS.BLIP_GARAGE} ${properTypeName}`,
            data: [garage.index], // Shop Index
            callback: GarageFunctions.open,
            isPlayerOnly: true,
        });

        Athena.controllers.blip.append({
            pos: garage.position,
            color: 4,
            sprite: 50,
            scale: 1,
            shortRange: true,
            text: LOCALE_GARAGE_FUNCS.BLIP_GARAGE,
        });

        Athena.controllers.marker.append({
            uid: `marker-garage-${garage.index}`,
            pos: new alt.Vector3(garage.position.x, garage.position.y, garage.position.z - 1),
            color: new alt.RGBA(0, 150, 0, 100),
            type: 1,
            maxDistance: 10,
            scale: { x: 2, y: 2, z: 3 },
        });

        if (!parkingSpots[garage.index]) {
            parkingSpots[garage.index] = [];
        }

        // Create Spots for Each Garage Parking spot
        for (let i = 0; i < garage.parking.length; i++) {
            const spot = garage.parking[i];
            const colshape = new GarageSpaceShape(spot.position, spot.rotation, 1);
            parkingSpots[garage.index].push(colshape);
        }

        activeGarages.push(garage);
    }

    /**
     * 1. Obtain the current garage the player is accessing.
     * 2. Obtains all player vehicles from the database.
     * 3. Filter the vehicles down by doing the following...
     * 4. Verify the VehicleData has an entry for the vehicle model.
     * 5. Grab the garage type and verify that this garage type can spawn this vehicle.
     * 6. If the vehicle has never been spawned before it has {x: 0, y: 0, and z: 0 }
     *      6a. Meaning that the vehicle can be spawned ANYWHERE
     * 7. If the vehicle is not spawned and has no garage index.
     *      7a. Spawn the vehicle from any garage of the same type.
     * 8. If a garageIndex is not defined, look at currently spawned vehicles.
     *      8a. If a currently spawned vehicle does not match the vehicle we are looking for
     *      8b. Do not add to garage spawns
     *      8c. If the vehicle is close enough to a parking spot. Add to the vehicle list.
     *      8d. If the vehicle is too far away from parking spot we do not add the vehicle to the list.
     * 9. Push vehicle list to client.
     *
     * @static
     * @param {alt.Player} player
     * @param {(number | string)} shopIndex
     * @return {*}
     * @memberof GarageFunctions
     */
    static async open(player: alt.Player, shopIndex: number | string) {
        GarageUsers[player.id] = shopIndex;

        // 1
        alt.logWarning(`open - 1`);
        const index = activeGarages.findIndex((garage) => garage.index === shopIndex);
        if (index <= -1) {
            return;
        }

        const garage = activeGarages[index];
        const garageTypes = activeGarages[index].types;

        // 2
        alt.logWarning(`open - 2`);
        let playerVehicles = await Athena.vehicle.get.ownedVehiclesByPlayer(player);
        // let playerVehicles = await Athena.player.get.allVehicles(player);

        // 3
        alt.logWarning(`open - 3`);
        const validVehicles = playerVehicles.filter((vehicle) => {
            alt.logWarning(`open - 3 - filter - ${vehicle.model}`);
            // 4
            // Check if the VehicleData has this vehicle model.
            let data = null;
            if (typeof vehicle.model === 'string') {
                const modelAsString = vehicle.model as String;
                data = VehicleData.find((dat) => dat.name.toLowerCase() === modelAsString.toLowerCase());
                if (!data) {
                    return false;
                }
            } else {
                const modelAsNumber = vehicle.model as Number;
                data = VehicleData.find((dat) => dat.hash === modelAsNumber);
                if (!data) {
                    return false;
                }
            }

            // 5
            // Filter Vehicles by Type
            let typeValid = false;
            for (let i = 0; i < garageTypes.length; i++) {
                const type = garageTypes[i];
                if (isVehicleType(data.type, type)) {
                    typeValid = true;
                }
            }

            if (!typeValid) {
                return false;
            }

            // 6
            // Unspawned / New Vehicle - Can Spawn Anywhere
            // const vehicleDat = Athena.document.vehicle.get(vehicle);
            if (vehicle.pos.x === 0 && vehicle.pos.y === 0 && vehicle.pos.z === 0) {
                return true;
            }

            // 7
            // It's an existing vehicle and is spawned but has no garage.

            let existingVehicle = Athena.vehicle.get.spawnedVehicleByDatabaseID(vehicle.id);
            if ((existingVehicle && vehicle.garageInfo === null) || vehicle.garageInfo === undefined) {
                // The vehicle exists and may or may not be in a parking space
                // Need to check if the vehicle is close enough to a parking space.
                for (let i = 0; i < garage.parking.length; i++) {
                    const dist = Athena.utility.vector.distance2d(vehicle.pos, garage.parking[i].position);
                    if (dist > PARKING_SPACE_DIST_LIMIT) {
                        continue;
                    }

                    return true;
                }

                return false;
            }

            // 8
            // Return true because it has nowhere to go, it is not spawned, and has no garage. Allow spawning it.
            if (
                (!existingVehicle && vehicle.garageInfo === null) ||
                (!existingVehicle && vehicle.garageInfo === undefined)
            ) {
                return true;
            }

            // Check if the garage index belongs to the vehicle if it's present.
            if (vehicle.garageInfo === shopIndex) {
                return true;
            }

            // Append vehicles that have been spawned that the player has access to to this list.
            if (Athena.vehicle.spawn.temporary({ model: vehicle.model, pos: player.pos, rot: player.rot })) {
                return true;
            }

            return false;
        });

        // TODO Vehicle Cache
        VehicleCache[player.id] = validVehicles;

        if (validVehicles.length <= 0) {
            Athena.player.emit.soundFrontend(player, 'Hack_Failed', 'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS');
            Athena.player.emit.notification(player, LocaleController.get(LOCALE_KEYS.VEHICLE_NO_VEHICLES_IN_GARAGE));
            return;
        }

        // 9
        alt.emitClient(player, GARAGE_INTERACTIONS.OPEN, validVehicles);
    }

    /**
     * Determines if a position is close enough to a spot within 5 distance.
     * @param {Vector3} position - The position of the player.
     * @param {Array} parkingSpots - Array<PositionAndRotation>
     * @returns The distance between the player and the closest parking spot.
     */
    static isCloseToSpot(position: alt.IVector3, parkingSpots: Array<PositionAndRotation>): boolean {
        for (let i = 0; i < parkingSpots.length; i++) {
            const dist = Athena.utility.vector.distance2d(position, parkingSpots[i].position);
            if (dist >= 5) {
                continue;
            }

            return true;
        }

        return false;
    }

    /**
     * Finds an open spot for the garage.
     * @param {uniontype} garageIndex - number | string
     */
    static findOpenSpot(garageIndex: number | string): PositionAndRotation {
        const spots = parkingSpots[garageIndex];
        if (!spots) {
            return null;
        }

        const spot = spots.find((x) => x.getSpaceStatus());
        return spot ? spot.getPositionAndRotation() : null;
    }

    /**
     * Spawns a vehicle based on the vehicle ID.
     * @param {alt.Player} player - The player that is spawning the vehicle.
     * @param {number} id - The vehicle id.
     */
    static spawnVehicle(player: alt.Player, id: number) {
        if (!player || !player.valid) {
            return;
        }

        if (!VehicleCache[player.id] || VehicleCache[player.id].length <= 0) {
            Athena.player.emit.soundFrontend(player, 'Hack_Failed', 'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS');
            return;
        }

        const data = VehicleCache[player.id].find((ref) => `${ref.id.toString()}` === `${id}`);
        if (!data) {
            Athena.player.emit.soundFrontend(player, 'Hack_Failed', 'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS');
            return;
        }

        // if (Athena.vehicle.funcs.hasBeenSpawned(data.id)) {
        //     Athena.player.emit.soundFrontend(player, 'Hack_Failed', 'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS');
        //     Athena.player.emit.notification(player, LocaleController.get(LOCALE_KEYS.VEHICLE_ALREADY_SPAWNED));
        //     alt.emitClient(player, GARAGE_INTERACTIONS.CLOSE);
        //     return;
        // }

        // Get the garage terminal information.
        const shopIndex = GarageUsers[player.id];
        const index = activeGarages.findIndex((garage) => garage.index === shopIndex);
        if (index <= -1) {
            console.error(`Garage at ${shopIndex} was not found.`);
            return;
        }

        const openSpot = GarageFunctions.findOpenSpot(shopIndex);
        if (!openSpot) {
            Athena.player.emit.soundFrontend(player, 'Hack_Failed', 'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS');
            Athena.player.emit.notification(player, LocaleController.get(LOCALE_KEYS.VEHICLE_NO_PARKING_SPOTS));
            alt.emitClient(player, GARAGE_INTERACTIONS.CLOSE);
            return;
        }

        // Create and store the vehicle on the hashed vehicle parking spot.
        const hash = Athena.utility.hash.sha256(JSON.stringify(openSpot));

        // const dataOwnedVehicle = Athena.document.vehicle.get(data);
        data.pos = openSpot.position;
        data.rot = openSpot.rotation;
        const newVehicle = Athena.vehicle.spawn.persistent(data);
        Athena.document.vehicle.set(newVehicle, 'garageInfo', null);
        // const newVehicle = Athena.vehicle.spawn(data, openSpot.position, openSpot.rotation);

        if (!newVehicle) {
            Athena.player.emit.soundFrontend(player, 'Hack_Failed', 'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS');
            return;
        }

        LastParkedCarSpawn[hash] = newVehicle;
        Athena.player.emit.soundFrontend(player, 'Hack_Success', 'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS');
        alt.emitClient(player, GARAGE_INTERACTIONS.CLOSE, true);
    }

    /**
     * Removes a vehicle if its close to the garage.
     * Stores it in a garage.
     * @static
     * @param {alt.Player} player
     * @param {unknown} id
     * @return {*}
     * @memberof GarageFunctions
     */
    static async despawnVehicle(player: alt.Player, id: number) {
        alt.logWarning('try despawn vehicle ' + id);
        alt.logWarning('try despawn vehicle ' + player + player.valid + player.id);
        if (!player || !player.valid) {
            return;
        }

        alt.logWarning('try despawn vehicle A0 ' + id);

        // Check that the vehicle is currently spawned and exists.

        alt.Vehicle.all.forEach((ref) => {
            alt.logWarning('altvehicles ' + ref.id);
        });

        let vehicle = Athena.vehicle.get.spawnedVehicleByDatabaseID(id);

        if (!vehicle) {
            Athena.player.emit.soundFrontend(player, 'Hack_Failed', 'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS');
            return;
        }

        alt.logWarning('try despawn vehicle A ' + id);
        // Get the garage garage information, and position.
        // Determine if the vehicle is close enough to the garage.
        const shopIndex = GarageUsers[player.id];
        const index = activeGarages.findIndex((garage) => garage.index === shopIndex);
        if (index <= -1) {
            console.error(`Garage at ${shopIndex} was not found.`);
            return;
        }

        const garage = activeGarages[index];
        const vehicleData = Athena.document.vehicle.get(vehicle);
        alt.logWarning(
            'try despawn vehicle B ' +
                id +
                ' ' +
                index +
                JSON.stringify(vehicleData.pos) +
                JSON.stringify(garage.position) +
                JSON.stringify(vehicle.pos),
        );
        const dist = Athena.utility.vector.distance2d(vehicleData.pos, garage.position);

        alt.logWarning('try despawn vehicle B dist ' + dist);

        // Check if the vehicle is either close to a parking spot or the garage itself.
        if (dist >= 10 && !GarageFunctions.isCloseToSpot(vehicleData.pos, garage.parking)) {
            Athena.player.emit.soundFrontend(player, 'Hack_Failed', 'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS');
            Athena.player.emit.notification(player, LocaleController.get(LOCALE_KEYS.VEHICLE_TOO_FAR));
            return;
        }

        alt.logWarning('try despawn vehicle C ' + id);

        // Set the garage index.
        alt.logWarning('Read garageInfo: ' + vehicleData.garageInfo);
        Athena.document.vehicle.set(vehicle, 'garageInfo', shopIndex);
        alt.logWarning('GarageInfo updated to: ' + shopIndex);

        await Athena.vehicle.controls.update(vehicle);
        //Athena.vehicle.funcs.save(vehicle, { garageIndex: vehicle.id.garageIndex });

        alt.logWarning('try despawn vehicle D ' + id);
        // After setting the garage index. Despawn the vehicle.
        Athena.vehicle.despawn.one(vehicle.id);
        Athena.player.emit.soundFrontend(player, 'Hack_Success', 'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS');
    }
}
