import React from 'react';

export default class AgeGroupItem extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.toggle(this.props.textValue);
  }

  render(){
    return (
      <li className="age-group-item" 
        onClick={this.handleClick}>
        {this.props.textValue}
      </li>
    );
  }
}