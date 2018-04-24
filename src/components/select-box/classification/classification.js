import './_classification.scss';
import React from 'react';

export default class ClassificationSelect extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isVisible: false,
      classification: this.props.textValue,
    };
    this.toggleVisible = this.toggleVisible.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.invokeEdit = this.invokeEdit.bind(this);
    this.hideSelectOptions = this.hideSelectOptions.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.textValue !== this.props.textValue)
      this.setState({classification: nextProps.textValue});
  }

  toggleVisible(){
    if(this.props.edit)
      this.setState({isVisible: !this.state.isVisible});
  }

  hideSelectOptions(){
    this.setState({isVisible: false});
  }

  invokeEdit(){
    if(!this.props.edit)
      this.props.invokeEdit();
  }

  handleChange(e){
    //this.toggleVisible();
    this.hideSelectOptions();
    this.setState({classification: e.target.textContent});
    this.props.onSelect({target:{name: 'classification', value: e.target.textContent}});
  }

  render(){
    return(
      <div className="classification-list-wrap">
        <div className="classification-label">Division Class:</div>
        <div className={`classification-value${this.props.edit ? ' edit' : ''}${this.props.error ? ' error' : ''}`}
          onClick={this.toggleVisible}
          onDoubleClick={this.invokeEdit} 
          onBlur={this.hideSelectOptions}
          tabIndex="0">
          {this.state.classification || <span className="classification-select-placeholder" >select a class</span>}</div>
        <ul className={`classification-list${this.state.isVisible ? ' visible' : ''}`}>
          <li className="classification-item" 
            onClick={this.handleChange}>boys</li>
          <li className="classification-item" 
            onClick={this.handleChange}>girls</li>
        </ul>
      </div>
    );
  }
} 