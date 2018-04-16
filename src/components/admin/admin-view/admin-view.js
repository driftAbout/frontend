import React from 'react';
import {Redirect} from 'react-router-dom';
import AdminViewDivisions from '../admin-view-divisions/admin-view-divisions';
import AdminViewTournament from '../admin-view-tournaments/admin-view-tournaments';
import {TournamentSelect} from '../../select-box';
import {connect} from 'react-redux';
import {teamsGetByTournamentRequest} from '../../../actions/team-actions';
import {adminTournamentsGetRequest, adminTournamentCreateRequest} from '../../../actions/admin-tournaments-actions';
import {tournamentCreateRequest, tournamentUpdateRequest,tournamentGetRequest} from '../../../actions/tournament-actions';
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


    // this.divisionFormHandlers = {
    //   divisionCreateRequest: this.createDivision,
    //   divisionUpdateRequest: this.deleteDivision,
    //   divisionDeleteRequest: this.updateDivision,
    // };

    this.selectTournament =  this.selectTournament.bind(this);
    this.createDivision = this.createDivision.bind(this);
    this.deleteDivision = this.deleteDivision.bind(this);
    this.updateDivision = this.updateDivision.bind(this);
    this.divisionFormHandlers = this.divisionFormHandlers.bind(this);
    
  }

  //componentWillReceiveProps(nextProps){
    //if(nextProps.tournaments.length) return;
    // this.refreshTournamentData();
    // this.props.tournamentGetRequest(this.state.tournament._id)
    //   .then(action => {
    //     let tournament = action.payload;
    //     this.setState({
    //       tournament: tournament,
    //       divisions: tournament.divisions,
    //     });
    //   });
    // this.props.adminTournamentsGetRequest()
    //   .then(action => {
    //     let tournament = action.payload.filter(tourn => tourn._id === this.state.tournament._id)[0];
    //     this.setState({
    //       divisions: tournament.divisions || [], 
    //     });
    //   });
  //}

  divisionFormHandlers() {
    return {
      divisionCreateRequest: this.createDivision,
      divisionUpdateRequest: this.deleteDivision,
      divisionDeleteRequest: this.updateDivision,
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
    return this.props.divisionDeleteRequest(division)
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
          this.setState({
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
      //games: this.props.games || [],
    });
  }

  // selectTournament(tournament){
  //   if (tournament._id && !this.props.teams[tournament._id]){
  //     return this.props.teamsGetByTournament(tournament._id)
  //       .then(() => {
  //         this.setState({
  //           tournament: tournament, 
  //           teams: this.props.teams[tournament._id], 
  //           divisions: this.props.divisions[tournament._id], 
  //           games: this.props.games || [],
  //         });
  //       });
  //   }

  //   this.setState({
  //     tournament: tournament, 
  //     teams: this.props.teams[tournament._id], 
  //     divisions: this.props.divisions[tournament._id], 
  //     games: this.props.games || [],
  //   });
  // }

  render(){
    if (!localStorage.token) return <Redirect to='/' />;
    return (
      <section className="admin-view-container">
        <h2>Admin</h2>
        <TournamentSelect tournaments={this.props.tournaments}
          tournamentName={this.state.tournament.name}
          onSelect={this.selectTournament}
          lastOption={true}/>

        <AdminViewTournament tournament={this.state.tournament}
          submitHandlers={this.props.tournamentFormHandlers}
          selectTournament={this.selectTournament}
          isCollapsed={this.state.isCollapsed}/>

        {this.state.tournament ?
          <AdminViewDivisions divisions={this.state.divisions}
            tournament={this.state.tournament}
            // submitHandlers={this.props.divisionFormHandlers}
            submitHandlers={this.divisionFormHandlers()}
            //refresh={this.refreshTournamentData}
            teamAssign={this.props.teamAssign}
            teams={this.state.teams}
            //games={this.props.games}
          />
          : undefined}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.adminTournaments,
  // divisions: state.divisions,
  teams: state.teams,
  // games: state.games,
});

const mapDispatchToProps = dispatch => ({
  tournamentFormHandlers: {
    adminTournamentCreateRequest: tournament => dispatch(adminTournamentCreateRequest(tournament)),
    tournamentUpdateRequest: tournament => dispatch(tournamentUpdateRequest(tournament)),
  },
  divisionFormHandlers: {
    divisionCreateRequest: division => dispatch(divisionCreateRequest(division)),
    divisionUpdateRequest: division => dispatch(divisionUpdateRequest(division)),
    divisionDeleteRequest: division => dispatch(divisionDeleteRequest(division)),
  },

  divisionCreateRequest: division => dispatch(divisionCreateRequest(division)),
  divisionUpdateRequest: division => dispatch(divisionUpdateRequest(division)),
  divisionDeleteRequest: division => dispatch(divisionDeleteRequest(division)),

  teamAssign: (teamIds, divisionId) => dispatch(divisionPopulateRequest(teamIds, divisionId)),
  teamsGetByTournament: tournamentId => dispatch(teamsGetByTournamentRequest(tournamentId)),
  tournamentGetRequest: id => dispatch(tournamentGetRequest(id)),
  adminTournamentsGetRequest: () => dispatch(adminTournamentsGetRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);