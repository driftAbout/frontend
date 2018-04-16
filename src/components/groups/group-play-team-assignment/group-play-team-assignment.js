import './_group-play-team-assignment.scss';
import React from 'react';
import {TeamSelect} from '../../select-box';

export default class GroupTeamAssignment extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isCollapsed: true,
      divisions: '',
      teams: '',
      groupSlots: {
        A1: '',
        A2: '',
        A3: '',
        A4: '',
        B1: '',
        B2: '',
        B3: '',
        B4: '',
        C1: '',
        C2: '',
        C3: '',
        C4: '',
        D1: '',
        D2: '',
        D3: '',
        D4: '',
      },
    };

    this.onTeamSelect = this.onTeamSelect.bind(this);
    this.handleAssignTeams =  this.handleAssignTeams.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  componentDidMount(){
    if(this.props.division) {
      //create object with groups as properties and arrays of teams as values
      //{groupA: [team, team, team, team]}
      let groupTeams = ['groupA', 'groupB', 'groupC', 'groupD'].reduce((acc, cur, i) => {
        if(this.props.division[cur].length){
          this.props.division[cur].forEach(game => {
            if (game.gamenumber === (i * 6) + 1 || game.gamenumber === (i * 6) + 2){
              if(!acc[cur]) acc[cur] = [];
              acc[cur].push(game.teamA, game.teamB);
            }
          });
        }
        return acc;
      }, {});

      //create group slots object from groupTeams object 
      //using group letter and array position
      //{A1: team}
      let groupSlots =  Object.keys(groupTeams).reduce((acc, cur) => {
        let letter = cur[cur.length - 1];
        groupTeams[cur].forEach((team, i ) => { 
          acc[`${letter}${i + 1}`] = team ? team : '';
        });
        return acc;
      }, {});

      let teamList = '';
      if (this.props.teams){
        let div = this.props.division;
        if (this.props.teams[div.classification])  
          teamList = this.props.teams[div.classification][div.agegroup] || '';
      }
      this.setState({groupSlots: {...this.state.groupSlots, ...groupSlots}, teams: teamList});
    }

  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.groupSlots) return;
    this.setState({groupSlots: nextProps.groupSlots, teams: nextProps.teams});
  }

  toggleView(){
    this.setState({isCollapsed: !this.state.isCollapsed});
  }

  onTeamSelect(groupSlot, team){
    let groupSlots = {...this.state.groupSlots};
    groupSlots[groupSlot] = team;
    this.setState({groupSlots: groupSlots});
  }

  handleAssignTeams(){
    let teamIds = Object.values(this.state.groupSlots).filter(team => team ? team._id : null );
    this.props.teamAssign(teamIds, this.props.division._id);
  }

  render(){
    return (
      <section className={`group-team-assignment-container${this.state.isCollapsed ? ' collapsed' : ''}`}>
        <h4>Group Team Assignment</h4>
        <span className={`toggle-view${this.state.isCollapsed ? ' collapsed' : ''}`} onClick={this.toggleView}></span>
       
        <article className="group-play-container" >
          <h3>Group A</h3>
          <TeamSelect onSelect={this.onTeamSelect} 
            teamName={this.state.groupSlots.A1.name} 
            groupSlot="A1" teams={this.state.teams}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.A2.name} 
            groupSlot="A2" teams={this.state.teams}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.A3.name} 
            groupSlot="A3" teams={this.state.teams}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.A4.name}  
            groupSlot="A4" teams={this.state.teams}/>
        </article>

        <article className="group-play-container" >
          <h3>Group B</h3>
          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.B1.name} 
            groupSlot="B1" teams={this.state.teams}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.B2.name} 
            groupSlot="B2" teams={this.state.teams}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.B3.name} 
            groupSlot="B3" teams={this.state.teams}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.B4.name} 
            groupSlot="B4" teams={this.state.teams}/>
        </article>

        <article className="group-play-container" >
          <h3>Group C</h3>
          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.C1.name} 
            groupSlot="C1" teams={this.state.teams}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.C2.name} 
            groupSlot="C2" teams={this.state.teams}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.C3.name} 
            groupSlot="C3" teams={this.state.teams}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.C4.name} 
            groupSlot="C4" teams={this.state.teams}/>
        </article> 

        <article className="group-play-container" >
          <h3>Group D</h3>
          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.D1.name} 
            groupSlot="D1" teams={this.state.teams}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.D2.name} 
            groupSlot="D2" teams={this.state.teams}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.D3.name} 
            groupSlot="D3" teams={this.state.teams}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.D4.name} 
            groupSlot="D4" teams={this.state.teams}/>
        </article>
        <div className="group-team-assignment-btn-wrap">
          <button className="group-team-assignment-btn"
            onClick={this.handleAssignTeams}>
          Assign Teams
          </button>
        </div>   
      </section>
    );
  }
}