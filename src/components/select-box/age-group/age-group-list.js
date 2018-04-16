import './_age-group.scss';
import React from 'react';
import AgeGroupItem from './age-group-item';

const ageGroups = ['U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15', 'U16'];

export default class AgeGroupList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isVisible: false,
      textValue: '',
      age: this.props.textValue,
    };
    this.toggleVisible = this.toggleVisible.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.invokeEdit = this.invokeEdit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.textValue !== this.props.textValue)
      this.setState({age: nextProps.textValue});
  }

  toggleVisible(){
    if(this.props.edit)
      this.setState({isVisible: !this.state.isVisible});
  }

  invokeEdit(){
    if(!this.props.edit)
      this.props.invokeEdit();
  }

  handleChange(textValue){
    this.toggleVisible();
    this.setState({age: textValue});
    this.props.onSelect({target:{name: 'agegroup', value: textValue}});
  }

  render(){
    return(
      <div className="age-group-list-wrap">
        <div className="age-group-label">Age Group:</div>
        <div className={`age-group-value${this.props.edit ? ' edit' : ''}`}
          onClick={this.toggleVisible}
          onDoubleClick={this.invokeEdit}>
          {this.state.age || <span className="age-group-select-placeholder" >select age group</span>}</div>
        <ul className={`age-group-list${this.state.isVisible ? ' visible' : ''}`}>
          {ageGroups.map((age, i) => 
            <AgeGroupItem key={`${i}_${age}`} toggle={this.handleChange}
              textValue={age} />
          )}
        </ul>
      </div>
    );
  }
}