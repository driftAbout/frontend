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

const tournamentDelete = tournamentId => ({type: 'TOURNAMENT_DELETE', payload: tournamentId});

const tournamentUpdate = tournament => ({type: 'TOURNAMENT_UPDATE', payload: tournament});

const tournamentGetRequest = tournamentId => dispatch => {
  return superagent.get(`${__API_URL__}/tournament/${tournamentId}`)
    .then(res =>  dispatch(tournamentSet(res.body)));
};

const tournamentAllGetRequest = () => dispatch => {
  return superagent.get(`${__API_URL__}/tournament`)
    .then(res =>  dispatch(tournamentSetAll(res.body)));
    //.then(res => ({payload: res.body}) );
};

const tournamentCreateRequest = tournament => dispatch => {
  let token = localStorage.token;
  return superagent.post(`${__API_URL__}/tournament/create`)
    .set({'Authorization': `Bearer ${token}`})
    .send(tournament)
    .then(res =>  dispatch(tournamentSet(res.body)));
};

const tournamentDeleteRequest = tournamentId => dispatch => {
  let token = localStorage.token;
  return superagent.delete(`${__API_URL__}/tournament/${tournamentId}`)
    .set({'Authorization': `Bearer ${token}`})
    .then(() =>  dispatch(tournamentDelete(tournamentId)));
};

const tournamentUpdateRequest = tournament => dispatch => {
  let token = localStorage.token;
  return superagent.put(`${__API_URL__}/tournament/${tournament._id}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(tournament)
    .then(() =>  dispatch(tournamentUpdate(tournament)));
};

export {
  tournamentGetRequest,
  tournamentAllGetRequest,
  tournamentCreateRequest,
  tournamentUpdateRequest,
  setStateFromStorage,
  tournamentDeleteRequest,
};