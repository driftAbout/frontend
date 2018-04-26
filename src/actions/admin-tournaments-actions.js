import superagent from 'superagent';

const adminTournamentsSet = tournaments => ({
  type: 'ADMIN_TOURNAMENTS_SET',
  payload: tournaments,
});

const adminTournamentDelete = tournamentId => ({type: 'ADMIN_TOURNAMENT_DELETE', payload: tournamentId});

const adminTournamentUpdate = tournament => ({type: 'ADMIN_TOURNAMENT_UPDATE', payload: tournament});


const adminTournamentsGetRequest = () => dispatch => {
  let token = localStorage.token;
  return superagent.get(`${__API_URL__}/tournamentowner/user`)
    .set({'Authorization': `Bearer ${token}`})
    .then(res =>  dispatch(adminTournamentsSet(res.body)));
};


const adminTournamentCreateRequest = tournament => dispatch => {
  let token = localStorage.token;
  return superagent.post(`${__API_URL__}/tournament/create`)
    .set({'Authorization': `Bearer ${token}`})
    .send(tournament)
    .then(res =>  dispatch(adminTournamentsSet(res.body)));
};

const adminTournamentDeleteRequest = tournamentId => dispatch => {
  let token = localStorage.token;
  return superagent.delete(`${__API_URL__}/tournament/${tournamentId}`)
    .set({'Authorization': `Bearer ${token}`})
    .then(() =>  dispatch(adminTournamentDelete(tournamentId)));
};

const adminTournamentUpdateRequest = tournament => dispatch => {
  let token = localStorage.token;
  return superagent.put(`${__API_URL__}/tournament/${tournament._id}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(tournament)
    .then(() =>  dispatch(adminTournamentUpdate(tournament)));
};

const adminTournamentCreateDemoRequest = () => dispatch => {
  let token = localStorage.token;
  return superagent.post(`${__API_URL__}/tournament/create_demo`)
    .set({'Authorization': `Bearer ${token}`})
    .then(response => dispatch(adminTournamentsSet([response.body])));
};


export {
  adminTournamentsGetRequest,
  adminTournamentCreateRequest,
  adminTournamentDeleteRequest,
  adminTournamentUpdateRequest,
  adminTournamentCreateDemoRequest,
};