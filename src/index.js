import 'babel-polyfill';
// const React = require('react');
// const express = require('express');
// const renderToString = require('react-dom/server').renderToString
// const Home = require('./client/components/Home').default

// import React from 'react';
import express from 'express';
// import {renderToString} from 'react-dom/server';
// import Home from './client/components/Home';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import {matchRoutes} from 'react-router-config';
import Routes from './client/Routes';
import proxy from 'express-http-proxy';

const app = express();

// app.use('/api', proxy('https://react-ssr-api.herokuapp.com'));
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000';
        return opts;
    }
}));


// app.use(express.static('/public'));
app.use(express.static('public'));

// app.get('/', (req, res) => {
app.get('*', (req, res) => {
   // const store = createStore();
    const store = createStore(req);
    console.log('req.url in Index.js', req.url);


    // console.log(matchRoutes(Routes, req.path));
    // it returns a list of match routes
    // temporarily set req.path to /admins
    const promises = matchRoutes(Routes, req.path).map(({route}) => {
        return route.loadData? route.loadData(store): null;
    })
    .map(promise => {
        // to take care of nulls in loadData - some routes have no loadData fn
        if (promise) {
            return new Promise ((resolve, reject) => {
                promise.then(resolve).catch(resolve);
            })
        }
    })

    // console.log('index.js-promises: ',promises);

    Promise.all(promises).then(() => {
        // res.send(html);
        const context = {};
        const content = renderer(req, store, context);

        console.log('Index.js - context: ',context);

        if (context.url) {
            res.redirect(301, context.url);
            console.log('redirected');
        }

        if (context.notFound) {
            res.status(404);
        }
        res.send(content);
    })

    
});



app.listen(3000, () => {
    console.log('server is listening on port 3000')
});