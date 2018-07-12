import React from 'react';
// import {Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import AdminsListPage from './pages/AdminsListPage';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';

// export default () => {
//     return (
//         <div>
//             <Route exact path="/" component={Home} />
//             <Route exact path="/users" component={UsersList} />
//         </div>
//     );
// }
// component: HomePage,
// {
//     loadData,
//     path: '/users',
//     component: UsersListPage
// }


export default [
    {
        ...App,
        routes: [
            {
                path: '/',
                ...HomePage,
                exact: true
            },
            {
                path: '/users',
                ...UsersListPage
            },
            {
                path: '/admins',
                ...AdminsListPage
            },
            {
                ...NotFoundPage
            }
        ]
    }
    

];