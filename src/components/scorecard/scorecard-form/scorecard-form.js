import './_scorecard-form.scss';
import React from 'react';

export default class ScorecardForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      teamAResult: 0,
      teamBResult : 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(){
    this.setState({teamAResult: 0, teamBResult: 0});
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    let game = {...this.props.game};
    game.teamAResult = parseInt(this.state.teamAResult);
    game.teamBResult = parseInt(this.state.teamBResult);
    this.props.onComplete(game)
      .then(() => {
        this.setState({teamAScore: 0, teamBScore: 0});
        this.props.resetGameSelection('');
      });
  }

  render(){
    return (
      <form className="scorecard-form" onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="teamAResult">
            {this.props.game ? this.props.game.teamA.name : ''}
          </label>
          <input name="teamAResult"
            type="number"
            min="0"
            value={this.state.teamAResult}
            onChange={this.handleChange} />
        </fieldset>
        <fieldset>
          <label htmlFor="teamBResult">
            {this.props.game ? this.props.game.teamB.name : ''}
          </label>
          <input name="teamBResult"
            type="number"
            min="0"
            value={this.state.teamBResult}
            onChange={this.handleChange} />
        </fieldset>
        <div className='button-wrap'>
          <button type="submit">submit</button>
        </div>
      </form>
    );
  }
}