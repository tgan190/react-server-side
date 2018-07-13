import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


export default ChildComponent => {

    class RequireAuth extends Component {
        componentWillMount() {
          if(!this.props.auth) {
            this.props.history.push('/');
          }
        }
         

        render() {
          
          switch (this.props.auth) {
            case false:
              // return <Redirect to="/" />;
              // console.log('this.props.history',this.props.history);
              
              return null;
            case null:
              return <div>Loading...</div>;
            default:
              return <ChildComponent {...this.props} />;
          }
        }
      }
    

    function mapStateToProps ({auth}) {
        return {auth};
    }

    return connect(mapStateToProps)(RequireAuth);
}

