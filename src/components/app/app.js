import React from 'react';
import store from '../../lib/store';
import {Provider} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Landing from '../landing/landing';
import {AdminView} from '../admin';
import {setStateFromStorage} from '../../actions/tournament-actions';
import {saveToLocalStorage} from '../../lib/local-storage';
import {tournamentAllGetRequest} from '../../actions/tournament-actions';
import {divisionAllGetRequest} from '../../actions/division-actions';
//import {teamAllGetRequest} from '../../actions/team-actions';
//import {gameAllGetRequest} from '../../actions/game-actions';
import {adminTournamentsGetRequest} from '../../actions/admin-tournaments-actions';
import {setToken} from '../../actions/signin-signup-actions';
import {AppNav} from './';
import TournamentView from '../tournament/tournament-view/tournament-view';
import ScoreCardView from '../scorecard/scorecard-view/scorecard-view';
// import DivisionView from '../division/division-view/division-view';
// import GameView from '../game/game-view';


store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default class App extends React.Component{

  componentWillMount(){
    let state = store.getState();
    if (!state.token && localStorage.token) store.dispatch(setToken(localStorage.token));

    Promise.all([
      //store.dispatch(tournamentAllGetRequest()),
      //store.dispatch(divisionAllGetRequest()),
      //store.dispatch(teamAllGetRequest()),
      //store.dispatch(gameAllGetRequest()),
    ])
      .then(() => {
        if(store.getState().token && !store.getState().adminTournaments.length) return store.dispatch(adminTournamentsGetRequest());
      })
      .then(() => {
        let state = store.getState();
        if(!state.tournaments.length && localStorage.tournaments) store.dispatch(setStateFromStorage());
      })
      .catch(console.error);
  }

  render(){
    return (
      <Provider store={store}>
        <React.Fragment>
          <AppNav/>
          <main>
            <h1>Tournament!</h1>
            <Route exact path="/" render={() => (
              <Redirect to="/welcome/signin"/>
            )}/>
            <Route exact path="/admin" component={AdminView} />
            <Route exact path="/welcome/:auth" component={Landing} />
            {/* <Route exact path="/tournaments" render={props => {
              return <TournamentView {...props}/>;
            }} /> */}
            <Route exact path="/tournaments" component={TournamentView}/>

            <Route exact path="/scorecard" component={ScoreCardView} />

            {/* <Route exact path="/divisions" component={DivisionView} />
            <Route exact path="/games" component={GameView} /> */}
          </main>
        </React.Fragment>
      </Provider>
    );
  }
}
