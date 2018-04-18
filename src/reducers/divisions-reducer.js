export default (state={}, action) => {
  let {type, payload} = action;

  let takeAction = {};

  takeAction['SET_STATE'] = storage => storage.divisions;

  takeAction['RESET_STATE'] = () => ({});

  // takeAction['DIVISION_SET'] = division => {
  //   let tempState = {...state};
  //   if (!tempState[division.tournament]) tempState[division.tournament] = [];
  //   tempState[division.tournament].push(division);
  //   return tempState;
  // };

  takeAction['DIVISION_SET_ALL'] = divisions => {
    let tempState = {...state}; 
    divisions.forEach(division => {
      if (!tempState[division.tournament]) tempState[division.tournament] = [];
      tempState[division.tournament].push(division);
    });
    return tempState;
  };

  // takeAction['DIVISION_UPDATE'] = divisionUpdate => {
  //   let tempState = {...state};
  //   tempState[divisionUpdate.tournament] = tempState[divisionUpdate.tournament].map(division => 
  //     division._id === divisionUpdate._id
  //       ? divisionUpdate
  //       : division);
  //   return tempState;
  // };

  // takeAction['DIVISION_DELETE'] = divisionDelete => {
  //   let tempState = {...state};
  //   tempState[divisionDelete.tournament] = tempState[divisionDelete.tournament].filter(division => 
  //     division._id !== divisionDelete._id);
  //   return tempState;
  // };

  // takeAction['ADMIN_TOURNAMENTS_SET'] = tournaments => {
  //   let tempState = {...state};
  //   tournaments.forEach(tournament => {
  //     if (tournament.divisions.length) tempState[tournament._id] = tournament.divisions; 
  //   });
  //   return tempState;
  // };

  // takeAction['TOURNAMENT_SET_ALL'] = tournaments => {
  //   let tempState = {...state};
  //   tournaments.forEach(tournament => {
  //     if (tournament.divisions.length) tempState[tournament._id] = tournament.divisions; 
  //   });
  //   return tempState;
  // };

  return takeAction[type] ? takeAction[type](payload) : state;

};