import teamsReducer from '../../src/reducers/teams-reducer';

describe('Teams Reducer Test', function(){
 
  describe('TEAM_SET Test', () => {

    beforeAll(() => {

      this.action = {
        type: 'TEAM_SET',
        payload: {name: 'Flubber Bumbers'}, 
      };

      this.setTeam = teamsReducer('', this.action);
    });
    
    it('Should add a team to state', () => {
      expect(this.setTeam).toBeInstanceOf(Array);
      expect(this.setTeam).not.toBeNull();
    });

    it('Should contain the team', () => {
      expect(this.setTeam[0].name).toEqual('Flubber Bumbers');
    });
  });

  describe('TEAM_SET_ALL Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'TEAM_SET_ALL',
        payload: [{name: 'Flubber Bumbers'}, {name: 'Parmesan Feet'}], 
      };
      
      this.setAllTeams = teamsReducer([{name: 'The Hook Worms'}], this.action);
    });
    
    it('Should add a team to state', () => {
      expect(this.setAllTeams).toBeInstanceOf(Array);
      expect(this.setAllTeams).not.toBeNull();
    });

    it('Should contain multiple divisions', () => {
      expect(this.setAllTeams.length).toEqual(3);
    });
  });

  describe('RESET_STATE Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'RESET_STATE',
      };
      this.resetState = teamsReducer('', this.action);
    });
  
    it('Should return a state that an empty array', () => {
      expect(this.resetState).toEqual([]);
    });
  });

  describe('SET_STATE Test', () => {

    beforeAll(() => {

      this.action = {
        type: 'SET_STATE',
        payload:{teams: [{name: 'Flubber Bumbers'}, {name: 'Parmesan Feet'}]},
      };

      this.setState = teamsReducer('', this.action);
    });
    
    it('Should set the state to the value of the division property', () => {
      expect(this.setState).toBeInstanceOf(Array);
      expect(this.setState[1].name).toEqual('Parmesan Feet');
    });
  });

  describe('No matching action test', () => {

    beforeAll(() => {
      this.action = {
        type: 'SUBWAY_TOKEN',
        payload: 'Pelham_123',
      };
      this.noAction = teamsReducer(undefined, this.action);
    });
  
    it('Should return current state of an empty {}', () => {
      expect(this.noAction).toEqual([]);
    });
  });

});
