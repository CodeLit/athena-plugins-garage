import * as alt from 'alt-client';
import * as AthenaClient from '@AthenaClient/api';
import ViewModel from '@AthenaClient/models/viewModel';
import { OwnedVehicle } from '@AthenaShared/interfaces/vehicleOwned';
import { GARAGE_INTERACTIONS } from './events';
import { LOCALE_GARAGE_VIEW } from './locales';

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
        await AthenaClient.webview.setOverlaysVisible(false);

        const view = await AthenaClient.webview.get();
        view.on(`${PAGE_NAME}:Ready`, InternalFunctions.ready);
        view.on(`${PAGE_NAME}:Close`, InternalFunctions.close);
        view.on(`${PAGE_NAME}:Spawn`, InternalFunctions.spawn);
        view.on(`${PAGE_NAME}:Despawn`, InternalFunctions.despawn);
        AthenaClient.webview.openPages([PAGE_NAME]);
        AthenaClient.webview.focus();
        AthenaClient.webview.showCursor(true);
        alt.toggleGameControls(false);
        alt.Player.local.isMenuOpen = true;
    }

    static async close() {
        alt.toggleGameControls(true);

        AthenaClient.webview.setOverlaysVisible(true);

        const view = await AthenaClient.webview.get();
        view.off(`${PAGE_NAME}:Ready`, InternalFunctions.ready);
        view.off(`${PAGE_NAME}:Close`, InternalFunctions.close);
        view.off(`${PAGE_NAME}:Spawn`, InternalFunctions.spawn);
        view.off(`${PAGE_NAME}:Despawn`, InternalFunctions.despawn);

        AthenaClient.webview.closePages([PAGE_NAME]);
        AthenaClient.webview.unfocus();
        AthenaClient.webview.showCursor(false);

        alt.Player.local.isMenuOpen = false;
    }

    static async ready() {
        const view = await AthenaClient.webview.get();
        view.emit(`${PAGE_NAME}:SetLocale`, LOCALE_GARAGE_VIEW);
        view.emit(`${PAGE_NAME}:SetVehicles`, vehicles);
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
