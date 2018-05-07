export default (state=[], action) => {
  let {type, payload} = action;

  let takeAction = {};

  takeAction['SET_STATE'] = storage => storage.tournaments;

  takeAction['RESET_STATE'] = () => [];

  takeAction['TOURNAMENT_SET_ALL'] = tournaments => [...state, ...tournaments];

  return takeAction[type] ? takeAction[type](payload) : state;
};