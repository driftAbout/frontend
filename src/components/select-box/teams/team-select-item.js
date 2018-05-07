import React from 'react';

export default class TeamItem extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.toggle(this.props.team);
  }

  render(){
    return (
      <li className="team-item"
        onClick={this.handleClick}>
        {this.props.team.name || '- - none - -'}
      </li>
    );
  }
}