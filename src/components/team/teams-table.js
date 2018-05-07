import './_teams-table.scss';
import React from 'react';

export default class TeamsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  isWinner(team_path){
    let game = this.props.game;
    if (!game.complete) return false;
    let contender = team_path === 'teamA' ? 'teamB' : 'teamA';
    if (game.teamAResult === game.teamBResult){
      if (game.gamenumber < 25) return true;
      return game[`${team_path}RollingTotal`] > game[`${contender}RollingTotal`] ? true : false;
    }
    return game[`${team_path}Result`] > game[`${contender}Result`] ? true : false;
  }

  render() {
    return (
      this.props.game.teamA && this.props.game.teamB ?
        <table className="team-table">
          <thead>
            <tr>
              <td></td>
              <td>Goals</td>
              <td>Points</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            <tr className={`team-stats${this.isWinner('teamA') ? ' winner' : ''}`}>
              <td>{this.props.game.teamA.name}</td>
              <td>{this.props.game.teamAResult}</td>
              <td>{this.props.game.teamAPoints}</td>
              <td>{this.props.game.teamARollingTotal}</td>
            </tr>
            <tr className={`team-stats${this.isWinner('teamB') ? ' winner' : ''}`}>
              <td>{this.props.game.teamB.name}</td>
              <td>{this.props.game.teamBResult}</td>
              <td>{this.props.game.teamBPoints}</td>
              <td>{this.props.game.teamBRollingTotal}</td>
            </tr>
          </tbody>
        </table>
        : null
    );
  }
}
