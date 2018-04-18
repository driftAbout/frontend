import './_scorecard-view.scss';
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {TournamentSelect, DivisionSelect, GameSelect} from '../../select-box';
import {gameUpdateRequest, gameUpdateScoreRequest} from '../../../actions/game-actions';
import {tournamentGetRequest} from '../../../actions/tournament-actions';
import ScorecardForm from '../scorecard-form/scorecard-form';

class ScoreCardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournament: '',
      divisions: '',
      division: '',
      games: '',
      game: '',
    };
    this.selectTournament = this.selectTournament.bind(this);
    this.selectDivision = this.selectDivision.bind(this);
    this.selectGame = this.selectGame.bind(this);
    this.submitGameResults = this.submitGameResults.bind(this);
  }

  selectTournament(tournament){
    //fetch all the data for the tournament
    this.props.tournamentGetRequest(tournament._id)
      .then(action => {
        let tournament = action.payload;
        this.setState({
          tournament: tournament,
          divisions: tournament.divisions,
          division: tournament.divisions.filter(division => this.state.division._id === division._id)[0] || '',
          game: '',
        });
      });
  }

  selectDivision(division){
    this.setState({division: division, game: ''});
  }

  selectGame(game){
    this.setState({
      game: game,
    });
  }

  submitGameResults(game){
    return this.props.gameUpdateScoreRequest(game)
      .then(() => this.selectTournament(this.state.tournament));
  }

  render() {
    if (!localStorage.token) return <Redirect to='/' />;
    return (
      <section className="scorecard-view-container">
        <article className="scorecard-view-selections-wrap">
          <h2>Scorecard</h2>
          {/* <div className="scorecard-view-selections-wrap"> */}
          <TournamentSelect tournaments={this.props.tournaments}
            tournamentName={this.state.tournament.name}
            onSelect={this.selectTournament}/>

          <DivisionSelect divisions={this.state.divisions}
            divisionName={this.state.division.name || ''}
            onSelect={this.selectDivision}/>

          <GameSelect division={this.state.division}
            gameNumber={this.state.game.gamenumber}
            onSelect={this.selectGame}/>
          {/* </div> */}
        </article>
        {this.state.game ? (
          <article className="scorecard-view-form-wrap">
            <h2>{this.state.game.group}: [<span> Game {this.state.game.gamenumber} </span>]</h2>
            <ScorecardForm game={this.state.game}
              resetGameSelection={this.selectGame}
              onComplete={this.submitGameResults}/>
          </article>  
        ) : undefined}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  //tournaments: state.tournaments,
  tournaments: state.adminTournaments,
});

const mapDispatchToProps = dispatch => ({
  gameUpdateRequest: game => dispatch(gameUpdateRequest(game)),
  gameUpdateScoreRequest: game => dispatch(gameUpdateScoreRequest(game)),
  tournamentGetRequest: id => dispatch(tournamentGetRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCardView);