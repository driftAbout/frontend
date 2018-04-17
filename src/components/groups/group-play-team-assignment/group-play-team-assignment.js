import './_group-play-team-assignment.scss';
import React from 'react';
import {TeamSelect} from '../../select-box';

export default class GroupTeamAssignment extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      edit: false,
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
      groupSlotsRollback: '',
    };

    this.onTeamSelect = this.onTeamSelect.bind(this);
    this.handleAssignTeams =  this.handleAssignTeams.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount(){
    //if(!Object.keys(this.props.division).length) return this.setState({edit: true, isCollapsed: false});
    if(Object.keys(this.props.division).length) {
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
          acc[`${letter}${i + 1}`] = team ?  team : '';
        });
        return acc;
      }, {});

      let teamList = [];
      if (this.props.teams){
        let div = this.props.division;
        if (this.props.teams[div.classification])  
          teamList = this.props.teams[div.classification][div.agegroup] || [];
      }

      let groupSlotTeamList = Object.values(groupSlots).reduce((teams, team) => {
        if (team) teams[team.name] = null;
        return teams;
      }, {});

      let modTeamMap = teamList.forEach(team => {
        if (groupSlotTeamList[team.name] === undefined) groupSlotTeamList[team.name] = team;
      });
      let modTeamsList = modTeamMap ? Object.values(modTeamMap) : []; 

      let edit =  (!Object.values(groupSlots).length) ? true : false;
      this.setState({groupSlots: {...this.state.groupSlots, ...groupSlots}, groupSlotsRollback: {...this.state.groupSlots, ...groupSlots}, teams: modTeamsList, edit: edit});
    }

  }

  componentWillReceiveProps(nextProps){
    // if (!nextProps.groupSlots) return this.setState({edit: true});
    if (!nextProps.groupSlots) return;
    let edit =  (!Object.values(nextProps.groupSlots).length) ? true : false;
    this.setState({groupSlots: nextProps.groupSlots, teams: nextProps.teams, edit: edit});
  }

  toggleEdit(){
    this.setState({edit: !this.state.edit});
  }

  handleCancel(){
    this.setState({
      groupSlots: this.state.groupSlotsRollback || this.state.groupSlots,
    });

    this.toggleEdit();
  }

  toggleView(){
    this.setState({isCollapsed: !this.state.isCollapsed});
  }

  onTeamSelect(groupSlot, previousTeam, team){
    let teams = this.state.teams.filter(teamItem => teamItem._id !== team._id);
    if (previousTeam.name) teams.push(previousTeam);
    let groupSlots = {...this.state.groupSlots};
    groupSlots[groupSlot] = team;
    this.setState({groupSlots: groupSlots, teams: teams});
  }

  handleAssignTeams(){
    let teamIds = Object.values(this.state.groupSlots).filter(team => team ? team._id : null );
    this.props.teamAssign(teamIds, this.props.division._id)
      .then(() => this.setState({edit: false}));
  }

  

  render(){
    return (
      <section className={`group-team-assignment-container${this.state.isCollapsed ? ' collapsed' : ''}
      ${this.state.edit ? ' edit' : ''}`}>
        <h4>Group Team Assignment</h4>
        <span className={`toggle-view${this.state.isCollapsed ? ' collapsed' : ''}`} onClick={this.toggleView}></span>
       
        <article className="group-play-container" >
          <h3>Group A</h3>
          <TeamSelect onSelect={this.onTeamSelect} 
            teamName={this.state.groupSlots.A1.name} 
            team={this.state.groupSlots.A1}
            groupSlot="A1" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.A2.name}
            team={this.state.groupSlots.A2} 
            groupSlot="A2" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.A3.name}
            team={this.state.groupSlots.A3} 
            groupSlot="A3" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.A4.name}
            team={this.state.groupSlots.A4}   
            groupSlot="A4" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>
        </article>

        <article className="group-play-container" >
          <h3>Group B</h3>
          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.B1.name}
            team={this.state.groupSlots.B1}  
            groupSlot="B1" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.B2.name}
            team={this.state.groupSlots.B2}   
            groupSlot="B2" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.B3.name}
            team={this.state.groupSlots.B3}   
            groupSlot="B3" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.B4.name}
            team={this.state.groupSlots.B4}    
            groupSlot="B4" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>
        </article>

        <article className="group-play-container" >
          <h3>Group C</h3>
          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.C1.name}
            team={this.state.groupSlots.C1}    
            groupSlot="C1" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.C2.name}
            team={this.state.groupSlots.C2}    
            groupSlot="C2" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.C3.name}
            team={this.state.groupSlots.C3}    
            groupSlot="C3" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.C4.name}
            team={this.state.groupSlots.C4}    
            groupSlot="C4" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>
        </article> 

        <article className="group-play-container" >
          <h3>Group D</h3>
          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.D1.name}
            team={this.state.groupSlots.D1}    
            groupSlot="D1" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.D2.name}
            team={this.state.groupSlots.D2}  
            groupSlot="D2" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.D3.name}
            team={this.state.groupSlots.D3}  
            groupSlot="D3" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>

          <TeamSelect onSelect={this.onTeamSelect}
            teamName={this.state.groupSlots.D4.name}
            team={this.state.groupSlots.D4}  
            groupSlot="D4" teams={this.state.teams}
            edit={this.state.edit}
            toggleEdit={this.toggleEdit}/>
        </article>
        <div className="group-team-assignment-btn-wrap">
          {this.state.edit ? 
            <React.Fragment>
              <button className="group-team-assignment-btn"
                onClick={this.handleAssignTeams}>
              Assign Teams
              </button>
              <button onClick={this.handleCancel} type="button" name="cancel" >Cancel</button>
            </React.Fragment>
            :
            <button type="edit" name="edit" onClick={this.toggleEdit}>Edit</button>
          }
        </div>   
      </section>
    );
  }
}