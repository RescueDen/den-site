import React from 'react';
import ReactDOM from 'react-dom';

//Load in the redux components
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';


import App from './components/AppRouter';
import reducers from './reducers';

//Get a logger to log
const loggerMiddleware = createLogger();

//Build a store, to store the current state of the program
const store = createStore(reducers, applyMiddleware(thunk, loggerMiddleware));


//Render the main react component to the main div
ReactDOM.render(
    <Provider store={store}>
        <App/>
        </Provider>,
document.querySelector('#root') as HTMLElement
);