import {Alert} from "../models/Alert";
import AuthenticationState from "./AuthenticationState";
import AnimalState from "./AnimalState";
import ContentState from "./ContentState";
import FormsState from "./FormsState";
import EventsState from "./EventsState";
import AchievementsState from "./AchievementsState";
import CoursesState from "./CoursesState";
import FeedState from "./FeedState";
import LoggingState from "./LoggingState";
import InNeedState from "./InNeedState";
import PeopleState from "./PeopleState";
import VoucherState from "./VoucherState";
import ColonyState from "./ColonyState";

/**
 * This model describes the entire state of program
 */
export default interface ApplicationState {
    authentication: AuthenticationState,
    alerts: Alert[],
    animals: AnimalState,
    content:ContentState,
    colony:ColonyState,
    inNeedFoster: InNeedState,
    forms: FormsState,
    events:EventsState,
    achievements: AchievementsState,
    courses: CoursesState,
    feed:FeedState,
    logging: LoggingState,
    people:PeopleState,
    voucher:VoucherState
}