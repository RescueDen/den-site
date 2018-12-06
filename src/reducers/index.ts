import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alerts } from './alerts.reducer'
import { animals } from './animals.reducer'


import ApplicationState from '../state/ApplicationState';

//Define the root reducer
const rootReducer = combineReducers<ApplicationState>({
    authentication,
    alerts,
    animals
});

export default rootReducer;