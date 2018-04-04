import './_game-list.scss';
import React from 'react';
import GameItem from './game-item';

export default class GameSelect extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      division: this.props.division,
      isVisible: false,
      gameNumber: '',
    };
    this.toggleVisible = this.toggleVisible.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.gameNumber !== nextProps.gameNumber)
      this.setState({gameNumber: nextProps.gameNumber});
  }

  toggleVisible(){
    this.setState({isVisible: !this.state.isVisible});
  }

  handleChange(game){
    this.toggleVisible();
    this.setState({gameNumber: game.gamenumber});
    this.props.onSelect(game);
  }

  //   render(){
  //     return(
  //       <div className="game-list-wrap">
  //         <div className='game-value'
  //           onClick={this.toggleVisible}>
  //           {this.state.gameNumber || <span className="game-select-placeholder" >select a game</span>}</div>
  //         <ul className={`game-list${this.state.isVisible ? ' visible' : ''}`}>
  //           {this.props.division ? this.props.games.map(game => (game.teamA && game.teamB) ?
  //             <GameItem key={`${game._id}`} toggle={this.handleChange}
  //               game={game} />
  //             : undefined
  //           ) : undefined}
  //         </ul>
  //       </div>
  //     );
  //   }
  // }

  render(){
    return(
      <div className="game-list-wrap">
        <div className='game-value'
          onClick={this.toggleVisible}>
          {this.state.gameNumber ? ` Game ${this.state.gameNumber}` : <span className="game-select-placeholder" >select a game</span>}</div>
        <ul className={`game-list${this.state.isVisible ? ' visible' : ''}`}>
          {this.props.division ? 
            ['groupA', 'groupB', 'groupC', 'groupD', 'consolidation', 'semiFinal', 'final']
              .reduce((games, group) => {
                this.props.division[group].forEach(game => {
                  if (game.teamA && game.teamB)
                    games.push(
                      <GameItem key={game._id} 
                        toggle={this.handleChange}
                        game={game}
                        group={group} />
                    );
                });
                return games;
              },[])
            : undefined}
        </ul>
      </div>
    );
  }

}
