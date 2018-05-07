import './_team-view.scss';
import React from 'react';

export default class TeamView extends React.Component {
  constructor() {
    super();
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
      <ul className="team-view-list">
        {this.props.team ?
          this.state.isVisible ?
            <li className="team-view-item">
              <div>
                <span>{this.props.team.name ? this.props.team.name : ''}</span>
                <span className="goals">{this.props.result}</span>
              </div>
            </li>
            : undefined
          :undefined}
      </ul>
    );
  }
}
