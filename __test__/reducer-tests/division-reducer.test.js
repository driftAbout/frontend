import divisionsReducer from '../../src/reducers/divisions-reducer';

describe('Divisions Reducer Test', function(){
 
  describe('DIVISION_SET Test', () => {

    beforeAll(() => {

      this.action = {
        type: 'DIVISION_SET',
        payload: {name: 'boys U13', tournament: 11}, 
      };
      
      this.setDivision = divisionsReducer('', this.action);
      this.setAnotherDivision = divisionsReducer({'11': [{name: 'boys U10', tournament: 11}]}, this.action);
    });
    
    it('Should add a division to state', () => {
      expect(this.setDivision).toBeInstanceOf(Object);
      expect(this.setDivision).not.toBeNull();
    });

    it('Should contain the tournament', () => {
      expect(this.setDivision[11][0].name).toEqual('boys U13');
      expect(this.setAnotherDivision[11][0].name).toEqual('boys U10');
    });
  });

  describe('DIVISION_SET_ALL Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'DIVISION_SET_ALL',
        payload: [{name: 'boys U13', tournament: 11}, {name: 'boys U12', tournament: 11}], 
      };
      
      this.setAllDivisions = divisionsReducer({'11': [{name: 'boys U10', tournament: 11}]}, this.action);
      this.setMoreDivisions = divisionsReducer('', this.action);
    });
    
    it('Should add a Division to state', () => {
      expect(this.setAllDivisions).toBeInstanceOf(Object);
      expect(this.setAllDivisions).not.toBeNull();
    });

    it('Should contain multiple divisions', () => {
      expect(this.setAllDivisions[11].length).toEqual(3);
      expect(this.setMoreDivisions[11].length).toEqual(2);
    });
  });

  describe('DIVISION_DELETE Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'DIVISION_DELETE',
        payload: {name: 'boys U13', tournament: 11, _id: 23},  
      };

      this.mockState = {'11': [{name: 'boys U10', tournament: 11, _id: 13}, {name: 'boys U11', tournament: 11, _id: 21}, {name: 'boys U13', tournament: 11, _id: 23}]};
      
      this.deleteDivision = divisionsReducer(this.mockState, this.action);
    });
    
    it('Should delete a division from state', () => {
      expect(this.deleteDivision).toBeInstanceOf(Object);
      expect(this.deleteDivision).not.toBeNull();
      expect(this.deleteDivision[11].length).toEqual(2);
    });

    it('Should not contain the division', () => {
      expect(this.deleteDivision[11].every(val => val.name !== 'boys U13')).toBe(true);
    });
  });

  describe('DIVISION_UPDATE Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'DIVISION_UPDATE',
        payload: {name: 'girls U13', tournament: 11, _id: 23},
      };

      this.mockState = {'11': [{name: 'boys U10', tournament: 11, _id: 13}, {name: 'boys U11', tournament: 11, _id: 21}, {name: 'boys U13', tournament: 11, _id: 23}]};
      
      this.updateDivision = divisionsReducer(this.mockState, this.action);
    });
    
    it('Should update a division from state', () => {
      expect(this.updateDivision).toBeInstanceOf(Object);
      expect(this.updateDivision).not.toBeNull();
      expect(this.updateDivision[11].length).toEqual(3);
    });

    it('Should contain the updated division', () => {
      expect(this.updateDivision[11].some(val => val.name === 'girls U13')).toBe(true);
    });
  });


  describe('RESET_STATE Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'RESET_STATE',
      };
      this.resetState = divisionsReducer('', this.action);
    });
  
    it('Should return a state that an empty array', () => {
      expect(this.resetState).toEqual({});
    });
  });

  describe('SET_STATE Test', () => {

    beforeAll(() => {

      this.action = {
        type: 'SET_STATE',
        payload: {divisions: {'11': [{name: 'boys U10', tournament: 11, _id: 13}]}},
      };

      this.setState = divisionsReducer('', this.action);
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
      this.noAction = divisionsReducer(undefined, this.action);
    });
  
    it('Should return current state of an empty {}', () => {
      expect(this.noAction).toEqual({});
    });
  });

});
