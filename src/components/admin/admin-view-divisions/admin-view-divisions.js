import './_admin-view-divisions.scss';
import React from 'react';
import AdminDivisionItem from './admin-view-divisions-item';

export default class AdminViewDivisions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      divisions: this.props.divisions || [],
      teams: this.props.teams || '',
    };
    this.addDivision = this.addDivision.bind(this);
    this.removeDivision = this.removeDivision.bind(this);
  }

  componentWillReceiveProps(nextProps){
    //this.setState({divisions: nextProps.divisions, teams: nextProps.teams, games: this.props.games});
    this.setState({divisions: nextProps.divisions, teams: nextProps.teams});
  }

  addDivision(){
    this.setState({divisions: [...this.state.divisions, {}]});
  }

  removeDivision(){
    let divisions = [...this.state.divisions].filter(div => div.name);
    this.setState({divisions: divisions});
  }

  render(){
    return (
      <section className="admin-view-division-container">
        <ul>
          {this.state.divisions.length ? this.state.divisions.map((division, i) => 
            
            <AdminDivisionItem 
              key={i}
              division={division}
              tournament={this.props.tournament}
              submitHandlers = {this.props.submitHandlers}
              teamAssign={this.props.teamAssign}
              teams={this.props.teams}
              removeDivision={this.removeDivision}
            />
          )
            : undefined}
          { !this.state.divisions.length || this.state.divisions[this.state.divisions.length - 1].name  ? 
            <li className="add-division" 
              onClick={this.addDivision}>
              <span>add new division</span>
            </li>
            : undefined
          }
        </ul>
      </section>
    );
  }
}