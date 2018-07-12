import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../actions';
import {Helmet} from 'react-helmet';

class UsersList extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return this.props.users.map(user => {
            return <li key={user.id}>{user.name}</li>;
        })
    }

    head() {
        return (
        <Helmet>
            <title>{`${this.props.users.length} users loaded`}</title>
            <meta property="og:title" content="Users App" />
        </Helmet>
        );
    }

    render() {
        return (
            <div>
                {this.head()}
                Here is a list of users:
                <ul>{this.renderUsers()}</ul>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users
});

function loadData (store) {
    // console.log('Trying to load some user data');
    // store is passed when calling loadData in Index.js
    return store.dispatch(fetchUsers());
}

// export default connect(mapStateToProps, {fetchUsers})(UsersList)
// export {loadData};
export default {
    loadData,
    component: connect(mapStateToProps, {fetchUsers})(UsersList)
};