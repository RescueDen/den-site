import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alerts } from './alerts.reducer'
import { animals } from './animals.reducer'
import {info} from "./info.reducer";
import {news} from "./news.reducer";


import ApplicationState from '../state/ApplicationState';

//Define the root reducer
const rootReducer = combineReducers<ApplicationState>({
    authentication,
    alerts,
    animals,
    info,
    news
});

export default rootReducer;