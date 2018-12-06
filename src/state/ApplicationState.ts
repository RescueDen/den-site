import {Alert} from "../models/Alert";
import AuthenticationState from "./AuthenticationState";
import AnimalState from "./AnimalState";

/**
 * This model describes the entire state of program
 */
export default interface ApplicationState {
    authentication: AuthenticationState,
    alerts: Alert[],
    animals: AnimalState,
}