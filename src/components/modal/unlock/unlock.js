import './_unlock.scss';
import React from 'react';

export default class UnlockModal extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    this.props[e.target.name]();
  }

  render(){
    return (
      <div className={`modal-wrap${this.props.isVisible ? ' visible' : ''}`}>
        <div className="modal-container">
          <div className="message">
            This tournament is already under way or completed.  Changing some aspects of the tournament now may yield undesired results.
          </div>
          <div className="button-wrap">
            <button type="button" name="unlock" onClick={this.handleClick}>unlock</button>
            <button type="button" name="cancel" onClick={this.handleClick}>cancel</button>
          </div>
        </div>
      </div>
    );
  }
}