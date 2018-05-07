import './_group-play-view.scss';
import React from 'react';
import GroupPlayGroup from '../group-play-group/group-play-group';

export default class GroupPlayView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      division: this.props.division,
      isCollapsed: true,
    };
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView(){
    this.setState({isCollapsed: !this.state.isCollapsed});
  }

  render(){
    return (
      <section className={`group-play-view-container${this.state.isCollapsed ? ' collapsed' : ''}`}>
        <h2>Group Play</h2>
        <span className={`toggle-view${this.state.isCollapsed ? ' collapsed' : ''}`} onClick={this.toggleView}></span>

        { ['groupA', 'groupB', 'groupC', 'groupD'].map(group =>
          <GroupPlayGroup key={group} groupHeading={group.replace('group', 'Group ')}
            games={this.props.division[group]}/>
        )}

      </section>
    );
  }
}
