const thisYear = new Date().getFullYear();

export default (state={}, action) => {
  let {type, payload} = action;

  let takeAction = {};

  //takeAction['SET_STATE'] = storage => storage.teams;

  takeAction['RESET_STATE'] = () => ({});

  //takeAction['TEAM_SET'] = team => [...state, team];

  //takeAction['TEAM_SET_ALL'] = (teams => [...state, ...teams];

  //organize teams by tournament, classification, amd agegroup
  takeAction['TEAM_SET_ALL'] = (payload) => {
    let[tournamentId, teams] = payload;
    let tempState = {...state};
    teams.forEach(team => {
      if (!tempState[tournamentId]) tempState[tournamentId] = {};
      if (!tempState[tournamentId][team.classification]) 
        tempState[tournamentId][team.classification] = {};
      
      //convert birthyear to ageGroup
      let ageGroup = `U${thisYear - team.birthyear}`;

      if (!tempState[tournamentId][team.classification][ageGroup])
        tempState[tournamentId][team.classification][ageGroup] = [];

      tempState[tournamentId][team.classification][ageGroup].push(team);
    });
    return tempState;
  };

  return takeAction[type] ? takeAction[type](payload) : state;

};