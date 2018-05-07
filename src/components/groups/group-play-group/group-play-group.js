import './_group-play-group.scss';
import React from 'react';
import GameView from '../../game/game-view';

export default class GroupPlayGroup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isCollapsed: true,
    };
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView(){
    this.setState({isCollapsed: !this.state.isCollapsed});
  }

  render(){
    return (
      <article className={`group-view${this.state.isCollapsed ? ' collapsed' : ''}`}>
        <span className={`toggle-view${this.state.isCollapsed ? ' collapsed' : ''}`} onClick={this.toggleView}></span>
        <h3>{this.props.groupHeading}</h3>
        <GameView games={this.props.games}/>
      </article>
    );
  }
}