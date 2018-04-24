import './_tournament-list.scss';
import React from 'react';
import TournamentItem from './tournament-item';

export default class TournamentSelect extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tournaments: this.props.tournaments,
      isVisible: false,
      tournamentName: '',
    };
    this.toggleVisible = this.toggleVisible.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.hideSelectOptions = this.hideSelectOptions.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.tournamentName !== nextProps.tournamentName)
      this.setState({tournamentName: nextProps.tournamentName});
  }

  toggleVisible(){
    this.setState({isVisible: !this.state.isVisible});
  }

  hideSelectOptions(){
    this.setState({isVisible: false});
  }

  handleCreate(){
    //this.toggleVisible();
    this.hideSelectOptions();
    this.setState({tournamentName: ''});
    this.props.onSelect('');
  }

  handleChange(tournament){
    //this.toggleVisible();
    this.hideSelectOptions();
    this.setState({tournamentName: tournament.name});
    this.props.onSelect(tournament);
  }

  render(){
    return(
      <div className="tournament-list-wrap">
        <div className='tournament-value'
          onClick={this.toggleVisible}
          onBlur={this.hideSelectOptions}
          tabIndex="0">

          {this.state.tournamentName || <span className="tournament-select-placeholder" >select a tournament</span>}</div>
        <ul className={`tournament-list${this.state.isVisible ? ' visible' : ''}`}>
          {this.props.tournaments.length ? this.props.tournaments.map(tournament => 
            <TournamentItem key={`${tournament._id}`} toggle={this.handleChange}
              tournament={tournament} />
          ) : undefined}
          {this.props.lastOption ?
            <li className="tournament-item" onClick={this.handleCreate}>Create New Tournament</li>
            : undefined}
        </ul>
      </div>
    );
  }
}

