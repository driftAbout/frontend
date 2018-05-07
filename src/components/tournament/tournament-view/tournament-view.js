import './_tournament-view.scss';
import React from 'react';
import {connect} from 'react-redux';
import {TournamentSelect, DivisionSelect} from '../../select-box';
import {GroupPlayView} from '../../groups';
import EliminationRoundView from '../../elimination-round/elimination-round-view/elimination-round-view';
import {tournamentAllGetRequest, tournamentGetRequest} from '../../../actions/tournament-actions';

class TournamentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      tournament: '',
      divisions: '',
      division: '',
    };
    this.toggle = this.toggle.bind(this);
    this.selectTournament = this.selectTournament.bind(this);
    this.selectDivision = this.selectDivision.bind(this);
  }

  componentWillMount(){
    if(!this.props.tournaments.length && !localStorage.tournaments)
      return this.props.tournamentAllGetRequest()
        .catch(error => this.setState({error: error}));
  }

  toggle(){
    this.setState({isVisible: !this.state.isVisible});
  }

  selectTournament(tournament){
  //fetch all the data for the tournament
    this.props.tournamentGetRequest(tournament._id)
      .then(action => {
        let tournament = action.payload;
        this.setState({
          tournament: tournament,
          divisions: tournament.divisions,
        });
      });
  }

  selectDivision(division){
    this.setState({
      division: division,
    });
  }

  render() {
    return (
      <section className="tournament-view-container">
        <div className="tournament-view-selections-wrap">
          <h2>Tournaments</h2>
          {this.state.error ?
            <span className="tournament-view-error" >Tournament data is currently unavailable</span>
            :
            <React.Fragment >
              <TournamentSelect tournaments={this.props.tournaments}
                tournamentName={this.state.tournament.name}
                onSelect={this.selectTournament}/>

              <DivisionSelect divisions={this.state.divisions}
                divisionName={this.state.division.name}
                onSelect={this.selectDivision}/>
            </React.Fragment >
          }
        </div>
        {this.state.division ?
          (
            <React.Fragment >
              <GroupPlayView division={this.state.division} />
              <EliminationRoundView heading="Consolidation"
                games={this.state.division.consolidation}/>
              <EliminationRoundView heading="Semifinals"
                games={this.state.division.semiFinal}/>
              <EliminationRoundView heading="Final"
                games={this.state.division.final}/>
            </React.Fragment >
          )
          : undefined}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments,
});

const mapDispatchToProps = dispatch => ({
  tournamentAllGetRequest: () => dispatch(tournamentAllGetRequest()),
  tournamentGetRequest: id => dispatch(tournamentGetRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentView);