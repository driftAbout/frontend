const saveToLocalStorage = state => {
  state.tournaments.length ? localStorage.tournaments = JSON.stringify(state.tournaments) : delete localStorage.tournaments;
  state.adminTournaments.length ? localStorage.adminTournaments = JSON.stringify(state.adminTournaments) : delete localStorage.adminTournaments;
  Object.keys(state.divisions).length ? localStorage.divisions = JSON.stringify(state.divisions) : delete localStorage.divisions;
  Object.keys(state.teams).length ? localStorage.teams = JSON.stringify(state.teams) : delete localStorage.teams;
  Object.keys(state.games).length ? localStorage.games = JSON.stringify(state.games) : delete localStorage.games;
  state.token ? localStorage.token = state.token : delete localStorage.token;
};

export{saveToLocalStorage};