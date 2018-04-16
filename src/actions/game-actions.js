import superagent from 'superagent';

const gameSet = game => ({type: 'GAME_SET', payload: game});

const gameSetAll = game => ({type: 'GAME_SET_ALL', payload: game});

const gameUpdate = game => ({type: 'GAME_UPDATE', payload: game});

const gameGetRequest = gameId => dispatch => {
  return superagent.get(`${__API_URL__}/game/${gameId}`)
    .then(res => dispatch(gameSet(res.body)));
};

const gameAllGetRequest = () => dispatch => {
  return superagent.get(`${__API_URL__}/game`)
    .then(res => dispatch(gameSetAll(res.body)));
};

const gameUpdateRequest = game => dispatch => {
  let token = localStorage.token;
  return superagent.put(`${__API_URL__}/game/${game._id}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(game);
  //.then(() => dispatch(gameUpdate(game)));
};

const gameUpdateScoreRequest = game => dispatch => {
  let token = localStorage.token;
  return superagent.put(`${__API_URL__}/game/scorecard`)
    .set({'Authorization': `Bearer ${token}`})
    .send(game)
    .then(() => game);
};

export {gameGetRequest, gameAllGetRequest, gameUpdateRequest, gameUpdateScoreRequest};