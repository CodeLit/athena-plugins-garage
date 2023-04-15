import * as alt from 'alt-client';
import * as AthenaClient from '@AthenaClient/api';
import { OwnedVehicle } from '@AthenaShared/interfaces/vehicleOwned';
import ViewModel from '@AthenaClient/models/viewModel';
import { GARAGE_INTERACTIONS } from '../shared/events';
import { LOCALE_GARAGE_VIEW } from '../shared/locales';

const PAGE_NAME = 'Garage';

let vehicles: Partial<OwnedVehicle>[];

/**
 * Do Not Export Internal Only
 */
class InternalFunctions implements ViewModel {
    /**
     * Displays the Garage WebView to the client if available.
     * @static
     * @param {Partial<Vehicle>[]} _vehicles
     * @memberof InternalFunctions
     */
    static async show(_vehicles: OwnedVehicle[]): Promise<void> {
        vehicles = _vehicles;

        if (AthenaClient.webview.isAnyMenuOpen()) {
            return;
        }

        // Must always be called first if you want to hide HUD.

        AthenaClient.webview.ready(PAGE_NAME, InternalFunctions.ready);
        AthenaClient.webview.on(GARAGE_INTERACTIONS.SPAWN, InternalFunctions.spawn);
        AthenaClient.webview.on(GARAGE_INTERACTIONS.DESPAWN, InternalFunctions.despawn);
        AthenaClient.webview.openPages(PAGE_NAME, true, InternalFunctions.close);
        AthenaClient.webview.focus();
        AthenaClient.webview.showCursor(true);

        alt.toggleGameControls(false);
        alt.Player.local.isMenuOpen = true;
    }

    static async close(invokeClosePage = false) {
        alt.toggleGameControls(true);

        AthenaClient.webview.unfocus();
        AthenaClient.webview.showCursor(false);

        alt.Player.local.isMenuOpen = false;

        if (invokeClosePage) {
            AthenaClient.webview.closePages([PAGE_NAME]);
        }
    }

    static async ready() {
        AthenaClient.webview.emit(GARAGE_INTERACTIONS.SETLOCAL, LOCALE_GARAGE_VIEW);
        AthenaClient.webview.emit(GARAGE_INTERACTIONS.SETVEHICLE, vehicles);
    }

    static spawn(uid: string) {
        alt.emitServer(GARAGE_INTERACTIONS.SPAWN, uid);
    }

    static despawn(uid: string) {
        alt.emitServer(GARAGE_INTERACTIONS.DESPAWN, uid);
    }
}

alt.onServer(GARAGE_INTERACTIONS.OPEN, InternalFunctions.show);
alt.onServer(GARAGE_INTERACTIONS.CLOSE, InternalFunctions.close);
