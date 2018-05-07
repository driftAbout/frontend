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

  return takeAction[type] ? takeAction[type](payload) : state;

};