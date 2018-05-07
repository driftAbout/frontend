import './_division-list.scss';
import React from 'react';
import DivisionItem from './division-item';

export default class DivisionSelect extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      divisions: this.props.divisions,
      isVisible: false,
      divisionName: '',
    };
    this.toggleVisible = this.toggleVisible.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hideSelectOptions = this.hideSelectOptions.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.divisionName !== nextProps.divisionName)
      this.setState({divisionName: nextProps.divisionName});
  }

  toggleVisible(){
    this.setState({isVisible: !this.state.isVisible});
  }

  hideSelectOptions(){
    this.setState({isVisible: false});
  }

  handleChange(division){
    this.hideSelectOptions();
    this.setState({divisionName: division.name});
    this.props.onSelect(division);
  }

  render(){
    return(
      <div className="division-list-wrap">
        <div className='division-value'
          onClick={this.toggleVisible}
          onBlur={this.hideSelectOptions}
          tabIndex="0">

          {this.state.divisionName || <span className="division-select-placeholder" >select a division</span>}</div>
        <ul className={`division-list${this.state.isVisible ? ' visible' : ''}`}>
          {this.props.divisions.length ? this.props.divisions.map(division => 
            <DivisionItem key={`${division._id}`} toggle={this.handleChange}
              division={division} />
          ) : undefined}
        </ul>
      </div>
    );
  }
}

