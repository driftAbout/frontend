export default (state={}, action) => {
  let {type, payload} = action;

  let takeAction = {};

  takeAction['SET_STATE'] = storage => storage.divisions;

  takeAction['RESET_STATE'] = () => ({});

  takeAction['DIVISION_SET_ALL'] = divisions => {
    let tempState = {...state};
    divisions.forEach(division => {
      if (!tempState[division.tournament]) tempState[division.tournament] = [];
      tempState[division.tournament].push(division);
    });
    return tempState;
  };

  return takeAction[type] ? takeAction[type](payload) : state;

};