import {Alert} from "../models/Alert";
import AuthenticationState from "./AuthenticationState";
import AnimalState from "./AnimalState";
import InfoState from "./InfoState";
import NewsState from "./NewsState";
import InNeedOfFoster from "../models/InNeedOfFosterModel";
import FormsState from "./FormsState";
import EventsState from "./EventsState";
import AchievementsState from "./AchievementsState";

/**
 * This model describes the entire state of program
 */
export default interface ApplicationState {
    authentication: AuthenticationState,
    alerts: Alert[],
    animals: AnimalState,
    info:InfoState,
    news:NewsState,
    inNeedFoster: InNeedOfFoster,
    forms: FormsState,
    events:EventsState,
    achievements: AchievementsState
}