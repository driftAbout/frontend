import superagent from 'superagent';

const teamSet = team => ({type: 'TEAM_SET' , payload: team});

const teamSetAll = (tournamentId, teams) => ({type: 'TEAM_SET_ALL' , payload: [tournamentId, teams]});

const teamGetRequest = teamId => dispatch => {
  return superagent.get(`${__API_URL__}/teams/${teamId}`)
    .then(res => dispatch(teamSet(res.body)));
};


const teamAllGetRequest = () => dispatch => {
  return superagent.get(`${__API_URL__}/teams`)
    .then(res => dispatch(teamSetAll(res.body)));
};

const teamsGetByTournamentRequest = tournamentId => dispatch => {
  let token = localStorage.token;
  return superagent.get(`${__API_URL__}/teams/tournament/${tournamentId}`)
    .set({'Authorization': `Bearer ${token}`})
    .then(res => dispatch(teamSetAll(tournamentId, res.body)));
};

export {teamGetRequest, teamAllGetRequest, teamsGetByTournamentRequest};