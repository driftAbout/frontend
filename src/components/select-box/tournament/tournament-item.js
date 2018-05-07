import React from 'react';

export default class TournamentItem extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.toggle(this.props.tournament);
  }

  render(){
    return (
      <li className="tournament-item"
        onClick={this.handleClick}>
        {this.props.tournament.name}
      </li>
    );
  }
}