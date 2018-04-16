import React from 'react';

export default class GameItem extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    let game = {...this.props.game};
    game.group = this.props.group.replace('group', 'group ');
    this.props.toggle(game);
  }

  render(){
    return (
      <li className="game-item" 
        onClick={this.handleClick}>
        <h4><span>{this.props.group.replace('group', 'group ')}:</span>( Game {this.props.game.gamenumber} )</h4>
        <p>{this.props.game.teamA.name}</p>
        <p>{this.props.game.teamB.name}</p> 
      </li>
    );
  }
}