import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducers from './reducers';
import {renderRoutes} from 'react-router-config';
import axios from 'axios';

//import Home from './components/Home';

const axiosInstance = axios.create({
    baseURL: '/api'
});

// const store = createStore(reducers, {}, applyMiddleware(thunk));
const store = createStore(reducers,window.INITIAL_STATE, 
    applyMiddleware(thunk.withExtraArgument(axiosInstance)));

// ReactDOM.render(<Home />, document.querySelector('#root'));
// ReactDOM.hydrate(<Home />, document.querySelector('#root'));
ReactDOM.hydrate(
<Provider store={store}>
    <BrowserRouter>
        <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
</Provider>
, document.querySelector('#root'));