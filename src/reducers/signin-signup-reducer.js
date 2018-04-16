export default (state=null, action) => {
  let {type, payload} =  action;
  let takeAction = {};

  takeAction['SET_STATE'] = storage => storage.token;

  takeAction['TOKEN_SET'] = token => token;

  takeAction['RESET_STATE'] = () => null;

  return takeAction[type] ? takeAction[type](payload) : state;
};