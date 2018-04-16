import {combineReducers} from 'redux';
import divisionsReducer from './divisions-reducer';
import tournamentsReducer from './tournaments-reducer';
import gamesReducer from './games-reducer';
import teamsReducer from './teams-reducer';
import signinSignup from './signin-signup-reducer';
import adminTournamentsReducer from './admin-tournaments-reducer';

export default combineReducers(
  {
    divisions: divisionsReducer ,
    tournaments: tournamentsReducer ,
    games: gamesReducer,
    teams: teamsReducer,
    token: signinSignup,
    adminTournaments: adminTournamentsReducer,
  }
);