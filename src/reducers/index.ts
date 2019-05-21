import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alerts } from './alerts.reducer'
import { animals } from './animals.reducer'
import {info} from "./info.reducer";
import {news} from "./news.reducer";
import {inNeedFoster} from "./inNeedFoster.reducer";
import {forms} from "./forms.reducer";
import {events} from "./events.reducer";
import {achievements} from "./achievements.reducer";
import {courses} from "./courses.reducer";
import {feed} from "./feed.reducer";
import {logging} from "./logging.reducer";
import {people} from "./people.reducer";

import ApplicationState from '../state/ApplicationState';


//Define the root reducer
const rootReducer = combineReducers<ApplicationState>({
    authentication,
    alerts,
    animals,
    info,
    news,
    inNeedFoster,
    forms,
    events,
    achievements,
    courses,
    feed,
    logging,
    people
});

export default rootReducer;