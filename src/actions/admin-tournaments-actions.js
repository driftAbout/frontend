import superagent from 'superagent';

const adminTournamentsSet = tournaments => ({
  type: 'ADMIN_TOURNAMENTS_SET',
  payload: tournaments,
});


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


export {adminTournamentsGetRequest, adminTournamentCreateRequest};