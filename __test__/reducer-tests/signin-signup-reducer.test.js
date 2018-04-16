import signInUpReducer from '../../src/reducers/signin-signup-reducer';

describe('Signin SignUp Reducer Test', function(){
 
  describe('TOKEN_SET Test', () => {

    beforeAll(() => {

      this.action = {
        type: 'TOKEN_SET',
        payload: '1a2b3c4d5e6', 
      };
      
      this.setToken = signInUpReducer('', this.action);
    });
    
    it('Should set the state to the token sent', () => {
      expect(typeof this.setToken).toEqual('string');
      expect(this.setToken).not.toBeNull();
    });

    it('Should contain the token', () => {
      expect(this.setToken).toEqual('1a2b3c4d5e6');
    });
  });

  describe('RESET_STATE Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'RESET_STATE',
      };
      this.resetState = signInUpReducer('', this.action);
    });
  
    it('Should return a state that is null', () => {
      expect(this.resetState).toBeNull();
    });
  });

  describe('SET_STATE Test', () => {

    beforeAll(() => {

      this.action = {
        type: 'SET_STATE',
        payload: {token: '1a2b3c4d5e6'},
      };

      this.setState = signInUpReducer('', this.action);
    });
    
    it('Should set the state to the value of the token property', () => {
      expect(typeof this.setState).toEqual('string');
      expect(this.setState).toEqual('1a2b3c4d5e6');
    });
  });

  describe('No matching action test', () => {

    beforeAll(() => {
      this.action = {
        type: 'SUBWAY_TOKEN',
        payload: 'Pelham_123',
      };
      this.noAction = signInUpReducer(undefined, this.action);
    });
  
    it('Should return current state of null', () => {
      expect(this.noAction).toBeNull();
    });
  });

});
