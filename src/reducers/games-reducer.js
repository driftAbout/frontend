export default (state={}, action) => {
  let {type, payload} = action;

  let takeAction = {};

  takeAction['SET_STATE'] = storage => storage.games;

  takeAction['RESET_STATE'] = () => ({});

  takeAction['GAME_SET'] = game => {
    let tempState = {...state};
    if(!tempState[game.division]) tempState[game.division] = [];
    tempState[game.division].push(game);
    return tempState;
  };

  takeAction['GAME_SET_ALL'] = games => {
    let tempState = {...state};
    games.forEach(game => {
      if(!tempState[game.division]) tempState[game.division] = [];
      tempState[game.division].push(game);
    });
    return tempState;
  };


  // takeAction['ADMIN_TOURNAMENTS_SET'] = tournaments => {
  //   let tempState = {...state};
  //   tournaments.forEach(tournament => {
  //     tournament.divisions.forEach(division => {
  //       if(!tempState[division]) tempState[division] = [];
  //       tempState[division].push(...division.groupA, ...division.groupB)
  //     });
  //   });
  //   return tempState;
  // };

  // takeAction['TOURNAMENT_SET_ALL'] = tournaments => {
  //   let tempState = {...state};
  //   tournaments.forEach(tournament => {
  //     tournament.divisions.forEach(division => {
  //       if(!tempState[division]){
  //         tempState[division] = {
  //           groupA: division.groupA,
  //           groupA: division.groupA,
  //           groupA: division.groupA,
  //           groupA: division.groupA,
  //         };
  //       }
  //       //tempState[division].push(...division.groupA, ...division.groupB);
  //     });
  //   });
  //   return tempState;
  // };

  return takeAction[type] ? takeAction[type](payload) : state;

};