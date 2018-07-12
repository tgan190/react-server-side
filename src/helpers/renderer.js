import React from 'react';
import {renderToString} from 'react-dom/server';
// import Home from '../client/components/Home';
import {StaticRouter} from 'react-router-dom';
import Routes from '../client/Routes';
import {Provider} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import serialize from 'serialize-javascript';
import {Helmet} from 'react-helmet';


// <Routes />
export default (req, store, context) => {
    console.log('renderer: req.path', req.path);
    console.log(JSON.stringify(store.getState()));
    // window.INITIAL_STATE = {JSON.stringify(store.getState())}
    // const content = renderToString(<Home />);
    // window.INITIAL_STATE = ${JSON.stringify(store.getState())}
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );

    // extract all the tags that helmut has accumulated from the components
    const helmet = Helmet.renderStatic();

    // const html = `
    return `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css">
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.INITIAL_STATE = ${serialize(store.getState())}
                </script>
                <script src="bundle.js"></script>
            </body>
        </html>
    `
}