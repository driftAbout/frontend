export default (state=[], action) => {
  let {type, payload} = action;

  let takeAction = {};

  takeAction['SET_STATE'] = storage => storage.tournaments;

  takeAction['RESET_STATE'] = () => [];

  //takeAction['TOURNAMENT_SET'] = tournament => [...state, tournament];

  takeAction['TOURNAMENT_SET_ALL'] = tournaments => [...state, ...tournaments];

  takeAction['TOURNAMENT_DELETE'] = tournamentId => state.filter(tournament => tournament._id !== tournamentId);

  takeAction['TOURNAMENT_UPDATE'] = tournamentUpdate => state.map(tournament => 
    tournament._id === tournamentUpdate._id ? 
      tournamentUpdate 
      : tournament
  );

  return takeAction[type] ? takeAction[type](payload) : state;

};