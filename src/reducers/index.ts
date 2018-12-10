import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alerts } from './alerts.reducer'
import { animals } from './animals.reducer'
import {info} from "./info.reducer";
import {news} from "./news.reducer";
import {inNeedFoster} from "./inNeedFoster.reducer";
import {forms} from "./forms.reducer";


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
});

export default rootReducer;