import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {TournamentSelect} from '../../select-box';
import AdminViewDivisions from '../admin-view-divisions/admin-view-divisions';
import AdminViewTournament from '../admin-view-tournaments/admin-view-tournaments';
import {teamsGetByTournamentRequest} from '../../../actions/team-actions';
import {adminTournamentsGetRequest,
  adminTournamentCreateRequest,
  adminTournamentUpdateRequest,
  adminTournamentDeleteRequest,
  adminTournamentCreateDemoRequest,
} from '../../../actions/admin-tournaments-actions';
import {tournamentGetRequest} from '../../../actions/tournament-actions';
import {divisionCreateRequest, divisionUpdateRequest, divisionDeleteRequest, divisionPopulateRequest}  from '../../../actions/division-actions';

class AdminView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      teams: '',
      tournament: '',
      divisions: [],
      isCollapsed: true,
    };

    this.selectTournament =  this.selectTournament.bind(this);
    this.createDivision = this.createDivision.bind(this);
    this.deleteDivision = this.deleteDivision.bind(this);
    this.updateDivision = this.updateDivision.bind(this);
    this.divisionFormHandlers = this.divisionFormHandlers.bind(this);
    this.collapseTournamentForm = this.collapseTournamentForm.bind(this);
    this.createDemoData = this.createDemoData.bind(this);
  }

  createDemoData(){
    this.props.adminTournamentCreateDemoRequest()
      .then(action => {
        this.setState({
          tournament: '',
          teams: '',
          divisions: '',
          isCollapsed: true,
        });
        return this.selectTournament(action.payload[0]);
      });
  }

  divisionFormHandlers() {
    return {
      divisionCreateRequest: this.createDivision,
      divisionUpdateRequest: this.updateDivision,
      divisionDeleteRequest: this.deleteDivision,
    };
  }

  createDivision(division){
    return this.props.divisionCreateRequest(division)
      .then(() => this.refreshTournamentData());
  }

  deleteDivision(division){
    return this.props.divisionDeleteRequest(division)
      .then(() => this.refreshTournamentData());
  }

  updateDivision(division){
    return this.props.divisionUpdateRequest(division)
      .then(() => this.refreshTournamentData());
  }

  refreshTournamentData(){
    return  this.props.tournamentGetRequest(this.state.tournament._id)
      .then(action => {
        let tournament = action.payload;
        this.setState({
          tournament: tournament,
          divisions: tournament.divisions,
        });
      });
  }

  selectTournament(tournament){
    if (tournament._id){
      return  this.props.tournamentGetRequest(tournament._id)
        .then(tournamentAction => {
          let fullTournament = tournamentAction.payload;
          if (this.props.teams[tournament._id]) return fullTournament;
          return this.props.teamsGetByTournament(tournament._id)
            .then (() => fullTournament);
        })
        .then(tournament => {
          return this.setState({
            tournament: tournament,
            teams: this.props.teams[tournament._id],
            divisions: tournament.divisions,
            isCollapsed: false,
          });
        });
    }

    this.setState({
      tournament: tournament,
      teams: '',
      divisions: '',
      isCollapsed: false,
    });
  }

  collapseTournamentForm(){
    this.setState({isCollapsed: true});
  }

  render(){
    if (!localStorage.token) return <Redirect to='/' />;
    return (
      <React.Fragment>
        <section className="admin-view-container">
          <h2>Admin</h2>
          <TournamentSelect tournaments={this.props.tournaments}
            tournamentName={this.state.tournament.name}
            onSelect={this.selectTournament}
            lastOption={true}/>

          <AdminViewTournament tournament={this.state.tournament}
            formHandlers={this.props.tournamentFormHandlers}
            selectTournament={this.selectTournament}
            collapseTournament={this.collapseTournamentForm}
            isCollapsed={this.state.isCollapsed}/>

          {this.state.tournament ?
            <AdminViewDivisions divisions={this.state.divisions}
              tournament={this.state.tournament}
              submitHandlers={this.divisionFormHandlers()}
              teamAssign={this.props.teamAssign}
              teams={this.state.teams}/>
            : undefined}

        </section>
        <section className="admin-view-demo-container">
          <button onClick={this.createDemoData}
            className="demo-btn">
            Create Demo Tournament
          </button>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.adminTournaments,
  teams: state.teams,
});

const mapDispatchToProps = dispatch => ({
  tournamentFormHandlers: {
    adminTournamentCreateRequest: tournament => dispatch(adminTournamentCreateRequest(tournament)),
    adminTournamentUpdateRequest: tournament => dispatch(adminTournamentUpdateRequest(tournament)),
    adminTournamentDeleteRequest: tournament_id => dispatch(adminTournamentDeleteRequest(tournament_id)),
  },

  divisionCreateRequest: division => dispatch(divisionCreateRequest(division)),
  divisionUpdateRequest: division => dispatch(divisionUpdateRequest(division)),
  divisionDeleteRequest: division => dispatch(divisionDeleteRequest(division)),

  teamAssign: (teamIds, divisionId) => dispatch(divisionPopulateRequest(teamIds, divisionId)),
  teamsGetByTournament: tournamentId => dispatch(teamsGetByTournamentRequest(tournamentId)),
  tournamentGetRequest: id => dispatch(tournamentGetRequest(id)),
  adminTournamentsGetRequest: () => dispatch(adminTournamentsGetRequest()),
  adminTournamentCreateDemoRequest: () => dispatch(adminTournamentCreateDemoRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);