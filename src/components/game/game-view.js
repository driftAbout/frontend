import './_game-view-list.scss';
import React from 'react';
//import TeamView from '../team/team-view';
import TeamsTable from '../team/teams-table';

export default class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    this.setState({isVisible: !this.state.isVisible});
  }

  render() {
    return (
      <ul className="game-view-list">
        {this.props.games.length ?
          this.props.games.map((game, i)  => (
            <li className="game-view" 
              key={`${game._id}${i}`}>
              <h5 key={game._id} onClick={this.toggle}>Game {game.gamenumber}</h5>
              <TeamsTable game={game} />
            </li> 
          ))
          : undefined}
      </ul>
    );
  }
}


// render() {
//   return (
//     <ul className="game-view-list">
//       {this.props.games.length ?
//         this.props.games.map((game, i)  => (
//           <li className="game-view" 
//             key={`${game._id}${i}`}>
//             <h5 key={game._id} onClick={this.toggle}>Game {game.gamenumber}</h5>
//             <TeamView 
//               team={game.teamA !== undefined ? game.teamA : ''} 
//               result={game.teamAResult !== undefined ? game.teamAResult : ''}/>

//             <TeamView 
//               team={game.teamB !== undefined ? game.teamB : ''} 
//               result={game.teamBResult !== undefined ? game.teamBResult : ''}/>
//           </li>
//         ))
//         : undefined}
//     </ul>
//   );
// }
