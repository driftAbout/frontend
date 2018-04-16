import React from 'react';

export default class DivisionItem extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.toggle(this.props.division);
  }

  render(){
    return (
      <li className="division-item" 
        onClick={this.handleClick}>
        {this.props.division.name}
      </li>
    );
  }
}