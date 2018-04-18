import './_team-select-list.scss';
import React from 'react';
import TeamItem from './team-select-item';

export default class TeamSelect extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      teams: this.props.teams,
      isVisible: false,
      teamName: '',
      team: this.props.team || '',
    };
    this.toggleVisible = this.toggleVisible.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.teamName !== nextProps.teamName)
      return this.setState({teamName: nextProps.teamName, team: nextProps.team});
    //this.setState({teams: nextProps.teams});
  }

  toggleVisible(){
    if (!this.props.edit) return;
    this.setState({isVisible: !this.state.isVisible});
  }

  handleDoubleClick(){
    if (!this.props.edit)
      this.props.toggleEdit();
  }

  handleCreate(){
    this.toggleVisible();
    this.setState({teamName: ''});
    this.props.onSelect('');
  }

  handleChange(team){
    let currentTeam = this.state.team;
    this.toggleVisible();
    this.setState({teamName: team.name, team: team});
    this.props.onSelect(this.props.groupSlot, currentTeam, team);
  }

  render(){
    return(
      <div className="team-list-wrap">
        <div className='team-value'
          onClick={this.toggleVisible}
          onDoubleClick={this.handleDoubleClick}>
          {this.state.teamName || <span className="team-select-placeholder" >select a team</span>}</div>
        <ul className={`team-list${this.state.isVisible ? ' visible' : ''}`}>
          {this.props.teams.length ? this.props.teams.map(team => 
            <TeamItem key={`${team._id}`} toggle={this.handleChange}
              team={team} />
          ) : undefined}
          <TeamItem toggle={this.handleChange}
            team={{}} />
        </ul>
      </div>
    );
  }
}

