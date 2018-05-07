export default (state=[], action) => {
  let {type, payload} = action;

  let takeAction = {};

  takeAction['SET_STATE'] = storage => storage.adminTournaments;

  takeAction['RESET_STATE'] = () => [];

  takeAction['ADMIN_TOURNAMENTS_SET'] = adminTournaments => [...state, ...adminTournaments];

  takeAction['ADMIN_TOURNAMENT_DELETE'] = tournamentId => [...state].filter(tournament => tournament._id !== tournamentId);

  takeAction['ADMIN_TOURNAMENT_UPDATE'] = tournamentUpdate => [...state].map(tournament =>
    tournament._id === tournamentUpdate._id ?
      tournamentUpdate
      : tournament
  );

  return takeAction[type] ? takeAction[type](payload) : state;

};