export default (state=[], action) => {
  let {type, payload} = action;

  let takeAction = {};

  takeAction['SET_STATE'] = storage => storage.adminTournaments;

  takeAction['RESET_STATE'] = () => [];

  //takeAction['TOURNAMENT_SET'] = tournament => [...state, tournament];

  takeAction['ADMIN_TOURNAMENTS_SET'] = adminTournaments => [...state, ...adminTournaments];

  takeAction['TOURNAMENT_DELETE'] = tournamentId => [...state].filter(tournament => tournament._id !== tournamentId);

  takeAction['TOURNAMENT_UPDATE'] = tournamentUpdate => [...state].map(tournament => 
    tournament._id === tournamentUpdate._id ? 
      tournamentUpdate 
      : tournament
  );

  return takeAction[type] ? takeAction[type](payload) : state;

};