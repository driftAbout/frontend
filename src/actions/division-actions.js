import superagent from 'superagent';


const divisionSet = division => ({type: 'DIVISION_SET', payload: division});

const divisionAllSet = divisions => ({type: 'DIVISION_SET_ALL', payload: divisions});

const divisionUpdate = division => ({type: 'DIVISION_UPDATE', payload: division});

const divisionDelete = division => ({type: 'DIVISION_DELETE', payload: division});


const divisionCreateRequest = division => dispatch => {
  let token = localStorage.token;
  return superagent.post(`${__API_URL__}/division/create`)
    .set({'Authorization': `Bearer ${token}`})
    .send(division)
    .then(res =>  dispatch(divisionSet(res.body)));
};

const divisionPopulateRequest = (teams, division_id) => dispatch => {
  let token = localStorage.token;
  console.log('teams', teams);
  return superagent.post(`${__API_URL__}/division/populate/${division_id}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(teams)
    .then(res => res.status);
};

const divisionGetRequest = divisionId => dispatch => {
  return superagent.get(`${__API_URL__}/division/${divisionId}`)
    .then(res =>  dispatch(divisionSet(res.body)));
};

const divisionAllGetRequest = () => dispatch => {
  return superagent.get(`${__API_URL__}/division`)
    .then(res =>  dispatch(divisionAllSet(res.body)));
};

const divisionUpdateRequest = division => dispatch => {
  let token = localStorage.token;
  return superagent.put(`${__API_URL__}/division/${division._id}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(division)
    .then(() =>  dispatch(divisionUpdate(division)));
};

const divisionDeleteRequest = division => dispatch => {
  let token = localStorage.token;
  return superagent.delete(`${__API_URL__}/division/${division._id}`)
    .set({'Authorization': `Bearer ${token}`})
    .then(() =>  dispatch(divisionDelete(division)));
};


export {divisionCreateRequest, divisionGetRequest, divisionAllGetRequest, divisionUpdateRequest, divisionDeleteRequest, divisionPopulateRequest}; 