import tournamentReducer from '../../src/reducers/tournaments-reducer';

describe('Tournament Reducer Test', function(){
 
  describe('TOURNAMENT_SET Test', () => {

    beforeAll(() => {

      this.action = {
        type: 'TOURNAMENT_SET',
        payload: {name: 'Rug Rat Rumble'}, 
      };
      
      this.setTournament = tournamentReducer('', this.action);
    });
    
    it('Should add a tournament to state', () => {
      expect(this.setTournament).toBeInstanceOf(Array);
      expect(this.setTournament).not.toBeNull();
    });

    it('Should contain the tournament', () => {
      expect(this.setTournament[0].name).toEqual('Rug Rat Rumble');
    });
  });

  describe('TOURNAMENT_SET_ALL Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'TOURNAMENT_SET_ALL',
        payload: [{name: 'Rug Rat Rumble'}, {name: 'Fidget Widget Roundup'}], 
      };
      
      this.setAllTournament = tournamentReducer([{name: 'Dammit Janet Jam'}], this.action);
    });
    
    it('Should add a tournament to state', () => {
      expect(this.setAllTournament).toBeInstanceOf(Array);
      expect(this.setAllTournament).not.toBeNull();
    });

    it('Should contain the tournament', () => {
      expect(this.setAllTournament.length).toEqual(3);
    });
  });

  describe('TOURNAMENT_DELETE Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'TOURNAMENT_DELETE',
        payload: 7, 
      };

      this.mockState = [{name: 'Rug Rat Rumble', _id: 7}, {name: 'Fidget Widget Roundup', _id: 23}, {name: 'Dammit Janet Jam', _id: 11}];
      
      this.deleteTournament = tournamentReducer(this.mockState, this.action);
    });
    
    it('Should delete a tournament from state', () => {
      expect(this.deleteTournament).toBeInstanceOf(Array);
      expect(this.deleteTournament).not.toBeNull();
      expect(this.deleteTournament.length).toEqual(2);
    });

    it('Should not contain the tournament', () => {
      expect(this.deleteTournament.every(val => val.name !== 'Rug Rat Rumble')).toBe(true);
    });
  });

  describe('TOURNAMENT_UPDATE Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'TOURNAMENT_UPDATE',
        payload: {name: 'Rug Rat Rampage', _id: 7}, 
      };

      this.mockState = [{name: 'Rug Rat Rumble', _id: 7}, {name: 'Fidget Widget Roundup', _id: 23}, {name: 'Dammit Janet Jam', _id: 11}];
      
      this.updateTournament = tournamentReducer(this.mockState, this.action);
    });
    
    it('Should update a tournament from state', () => {
      expect(this.updateTournament).toBeInstanceOf(Array);
      expect(this.updateTournament).not.toBeNull();
      expect(this.updateTournament.length).toEqual(3);
    });

    it('Should contain the updated tournament', () => {
      expect(this.updateTournament.some(val => val.name === 'Rug Rat Rampage')).toBe(true);
    });
  });


  describe('RESET_STATE Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'RESET_STATE',
      };
      this.resetState = tournamentReducer('', this.action);
    });
  
    it('Should return a state that an empty array', () => {
      expect(this.resetState).toEqual([]);
    });
  });

  describe('SET_STATE Test', () => {

    beforeAll(() => {

      this.action = {
        type: 'SET_STATE',
        payload: {tournaments: [{name: 'Rug Rat Rumble'}]},
      };

      this.setState = tournamentReducer('', this.action);
    });
    
    it('Should set the state to the value of the tournament property', () => {
      expect(this.setState).toBeInstanceOf(Array);
      expect(this.setTournament[0].name).toEqual('Rug Rat Rumble');
    });
  });

  describe('No matching action test', () => {

    beforeAll(() => {
      this.action = {
        type: 'SUBWAY_TOKEN',
        payload: 'Pelham_123',
      };
      this.noAction = tournamentReducer(undefined, this.action);
    });
  
    it('Should return current state of an empty []', () => {
      expect(this.noAction).toEqual([]);
    });
  });

});
