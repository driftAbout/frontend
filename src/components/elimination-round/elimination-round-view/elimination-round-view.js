import './_elimination-round-view.scss';
import React from 'react';
import GameView from '../../game/game-view';

export default class EliminationRoundView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      games: this.props.games,
      isCollapsed: true,
    };
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView(){
    this.setState({isCollapsed: !this.state.isCollapsed});
  }

  render(){
    return (
      <section className={`elimination-round-view-container${this.state.isCollapsed ? ' collapsed' : ''}`}>
        <h2>{this.props.heading}</h2>
        <span className={`toggle-view${this.state.isCollapsed ? ' collapsed' : ''}`} onClick={this.toggleView}></span>
        <GameView games={this.props.games}/>
      </section>
    );
  }
}