import gamesReducer from '../../src/reducers/games-reducer';

describe('Games Reducer Test', function(){
 
  describe('GAME_SET Test', () => {

    beforeAll(() => {

      this.action = {
        type: 'GAME_SET',
        payload: {gamenumber: 1, division: 11}, 
      };
      
      this.setGame = gamesReducer('', this.action);
      this.setAnotherGame = gamesReducer({'11': [{gamenumber: 2, division: 11}]}, this.action);
    });
    
    it('Should add a division to state', () => {
      expect(this.setGame).toBeInstanceOf(Object);
      expect(this.setGame).not.toBeNull();
    });

    it('Should contain the tournament', () => {
      expect(this.setGame[11][0].gamenumber).toEqual(1);
      expect(this.setAnotherGame[11][0].gamenumber).toEqual(2);
    });
  });

  describe('GAME_SET_ALL Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'GAME_SET_ALL',
        payload: [{gamenumber: 2, division: 11}, {gamenumber: 3, division: 11}], 
      };
      
      this.setAllGames = gamesReducer({'11': [{gamenumber: 1, division: 11}]}, this.action);
      this.setMoreGames = gamesReducer('', this.action);
    });
    
    it('Should add a Division to state', () => {
      expect(this.setAllGames).toBeInstanceOf(Object);
      expect(this.setAllGames).not.toBeNull();
    });

    it('Should contain multiple divisions', () => {
      expect(this.setAllGames[11].length).toEqual(3);
      expect(this.setMoreGames[11].length).toEqual(2);
    });
  });

  describe('RESET_STATE Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'RESET_STATE',
      };
      this.resetState = gamesReducer('', this.action);
    });
  
    it('Should return a state that an empty array', () => {
      expect(this.resetState).toEqual({});
    });
  });

  describe('SET_STATE Test', () => {

    beforeAll(() => {

      this.action = {
        type: 'SET_STATE',
        payload: {games: {'11': [{name: 'boys U10', tournament: 11, _id: 13}]}},
      };

      this.setState = gamesReducer('', this.action);
    });
    
    it('Should set the state to the value of the division property', () => {
      expect(this.setState).toBeInstanceOf(Object);
      expect(this.setState[11][0].name).toEqual('boys U10');
    });
  });

  describe('No matching action test', () => {

    beforeAll(() => {
      this.action = {
        type: 'SUBWAY_TOKEN',
        payload: 'Pelham_123',
      };
      this.noAction = gamesReducer(undefined, this.action);
    });
  
    it('Should return current state of an empty {}', () => {
      expect(this.noAction).toEqual({});
    });
  });

});
