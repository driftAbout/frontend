import './_admin-view-divisions.scss';
import React from 'react';
import {DivisionForm} from '../../division';
import {GroupTeamAssignment} from '../../groups';

export default class AdminDivisionItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isCollapsed: true,
    };
    this.toggleView = this.toggleView.bind(this);
    this.collapseRemoveDivision = this.collapseRemoveDivision.bind(this);
  }

  componentWillMount(){
    if (!Object.keys(this.props.division).length ) return this.setState({isCollapsed: false});
  }

  toggleView(){
    this.setState({isCollapsed: !this.state.isCollapsed});
  }

  collapseRemoveDivision(){
    this.toggleView();
    this.props.removeDivision();
  }

  render(){
    return (
      <li className="admin-view-division-item">
        <div className={`admin-view-division-item-view${this.state.isCollapsed ? ' collapsed' : ''}`} >
          <span className={`toggle-view${this.state.isCollapsed ? ' collapsed' : ''}`} 
            onClick={this.toggleView}></span>

          <h3>Division:</h3>
          <DivisionForm  division={this.props.division}
            tournament={this.props.tournament}
            teams={this.props.teams}
            onComplete={this.props.division.name 
              ? this.props.submitHandlers.divisionUpdateRequest
              : this.props.submitHandlers.divisionCreateRequest
            } 
            onDelete={this.props.submitHandlers.divisionDeleteRequest}
            removeDivision={this.collapseRemoveDivision}
            isCollapsed={this.state.isCollapsed}/>

          {this.props.division._id ?
            <GroupTeamAssignment 
              teamAssign={this.props.teamAssign}
              division={this.props.division}
              teams={this.props.teams}/>
            : undefined}
        </div>
      </li> 
    );
  }
}
