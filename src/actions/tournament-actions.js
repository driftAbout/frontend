import superagent from 'superagent';

const setStateFromStorage = () => {
  let storage = {
    tournaments: localStorage.tournaments ? JSON.parse(localStorage.tournaments) : [],
    divisions: localStorage.divisions ? JSON.parse(localStorage.divisions) : {},
    teams: localStorage.teams ? JSON.parse(localStorage.teams) : {},
    games: localStorage.games ? JSON.parse(localStorage.games) : {},
    token: localStorage.token ? localStorage.token : null,
    adminTournaments: localStorage.adminTournaments ? JSON.parse(localStorage.adminTournaments) : [],
  };

  return {
    type: 'SET_STATE',
    payload: storage,
  };
};

const tournamentSet = tournament => ({type: 'TOURNAMENT_SET', payload: tournament});

const tournamentSetAll = tournaments => ({type: 'TOURNAMENT_SET_ALL', payload: tournaments});

const tournamentGetRequest = tournamentId => dispatch => {
  return superagent.get(`${__API_URL__}/tournament/${tournamentId}`)
    .then(res =>  dispatch(tournamentSet(res.body)));
};

const tournamentAllGetRequest = () => dispatch => {
  return superagent.get(`${__API_URL__}/tournament`)
    .then(res =>  dispatch(tournamentSetAll(res.body)));
};

export {
  tournamentGetRequest,
  tournamentAllGetRequest,
  setStateFromStorage,
};