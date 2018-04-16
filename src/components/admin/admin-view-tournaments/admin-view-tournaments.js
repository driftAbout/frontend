import React from 'react';
import {TournamentForm} from '../../tournament'; 

export default class AdminViewTournament extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tournament: this.props.tournament,
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({tournament: nextProps.tournament});
  }

  render(){
    return (
      <section className={`admin-tournament-view-container${this.props.isCollapsed ? ' collapsed' : ''}`}> 
        {/* <h2>{this.state.tournament.name}</h2> */}
        <h3>Tournament</h3>
        <TournamentForm tournament={this.state.tournament}
          selectTournament={this.props.selectTournament}
          onComplete={this.state.tournament.name 
            ? this.props.submitHandlers.tournamentUpdateRequest
            : this.props.submitHandlers.tournamentCreateRequest
          }/>
      </section>
    );
  }
}
