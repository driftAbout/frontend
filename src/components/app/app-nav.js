import './_app.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import store from '../../lib/store';

export default class AppNav extends React.Component{

  onLogOut(){store.dispatch({type:'RESET_STATE'});}

  render(){
    return (
      <ul className="app-nav-list">
        <li className="app-nav-item"><Link to="/welcome/signin">Home</Link></li>
        {localStorage.token ? (
          <React.Fragment>
            <li className="app-nav-item"><Link to="/admin">Admin</Link></li>
            <li className="app-nav-item"><Link to="/scorecard">Scorecard</Link></li>
            <li className="app-nav-item" onClick={this.onLogOut}><Link to="/welcome/signin">Logout</Link></li>
          </React.Fragment>
        ) : undefined}
      </ul>
    );
  }
}