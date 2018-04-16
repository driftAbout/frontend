import React from 'react';
import {AgeGroupList, ClassificationSelect} from '../../select-box';

export default class DivisionForm extends  React.Component{
  constructor(props){
    super(props);
    this.state = {
      agegroup: this.props.division.agegroup || '',
      classification: this.props.division.classification || '',
      name: this.props.division.name || '',
      _id: this.props.division._id || '',
      edit: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleInvokeEdit = this.handleInvokeEdit.bind(this);
  }

  componentDidMount(){
    if(!Object.keys(this.props.division).length) return this.setState({edit: true});
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.division) return this.setState({edit: true});
    this.setState({
      agegroup: nextProps.division.agegroup,
      classification: nextProps.division.classification,
      name: nextProps.division.name,
      _id: nextProps.division._id,
    });
  }

  toggleEdit(){
    this.setState({edit: !this.state.edit});
  }

  handleInvokeEdit(){
    if(!this.state.edit)
      this.setState({edit: true});
  }

  handleCancel(){
    if (!this.state._id) return this.props.removeDivision();
    this.setState({
      edit: !this.state.edit,
      name: this.props.division.name || '',
      agegroup: this.props.division.agegroup || '',
      classification: this.props.division.classification || '',
    });
  }
  
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleDelete(e){
    e.preventDefault();
    if(!this.state._id) {
      //this.props.removeDivision();
      this.setState({agegroup: '', classification: '', name: '', _id: ''});
      return;
    }
    return this.props.onDelete({...this.state, tournament: this.props.tournament._id});    
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.state.name || !this.state.classification || !this.state.agegroup ) return;
    let division = {...this.state};
    delete division.edit;
    if (division._id === '') delete division._id;
    if (!division.tournament) division.tournament = this.props.tournament._id;
    this.props.onComplete(division)
      .then(() => this.setState({edit: false}));
  }

  render(){
    return(
      <form className={`division-form${this.state.edit ? ' edit' : ''}`} name="division" onSubmit={this.handleSubmit}>
        <input name="name"
          placeholder="Division Name"  
          type="text"
          onChange={this.handleChange}
          onDoubleClick={this.handleInvokeEdit}
          value={this.state.name}
          readOnly={!this.state.edit}
        />

        <ClassificationSelect onSelect={this.handleChange}
          textValue={this.state.classification}
          edit={this.state.edit}
          invokeEdit={this.handleInvokeEdit}/>

        <AgeGroupList onSelect={this.handleChange} 
          textValue={this.state.agegroup} 
          edit={this.state.edit}
          invokeEdit={this.handleInvokeEdit}/>

        <div className="division-form-btn-wrap">
          {this.state.edit ?
            <React.Fragment>
              <button onClick={this.handleDelete} type="button" name="remove" >Delete</button>
              <button type='submit' name='save'>Save</button>
              <button onClick={this.handleCancel} type="button" name="cancel" >Cancel</button>
            </React.Fragment>
            : undefined}

          {!this.state.edit ?
            <button type="edit" name="edit" onClick={this.toggleEdit}>Edit</button>
            : undefined}
        </div>
      </form>
    );
  }
}