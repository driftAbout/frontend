import React from 'react';
import UnlockModal from '../../modal/unlock/unlock';

function convertDateString(dateString){
  if (!dateString) return null;
  let [year, month, day] = dateString.split('-');
  return new Date(`${month}/${day}/${year}`);
}

export default class TournamentForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      dateStart: '',
      dateEnd: '',
      nameError: null,
      dateStartError: null,
      dateEndError: null,
      edit: false,
      modalVisible: false,
    };
    this.handleChange =  this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleInvokeEdit = this.handleInvokeEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.unlock = this.unlock.bind(this);
    this.toggleUnlockModal = this.toggleUnlockModal.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.tournament) return this.setState({name: '', dateStart: '', dateEnd: '', _id: '', edit: true});
    this.setState({
      _id: nextProps.tournament._id,
      name: nextProps.tournament.name,
      dateStart: nextProps.tournament.dateStart ? nextProps.tournament.dateStart.replace(/T.*$/, '') : '',
      dateEnd: nextProps.tournament.dateEnd ? nextProps.tournament.dateEnd.replace(/T.*$/, '') : '',
      edit: false,
      locked: nextProps.tournament.locked,
    });
  }

  toggleEdit(){
    this.setState({edit: !this.state.edit});
  }

  toggleUnlockModal(){
    this.setState({modalVisible: !this.state.modalVisible});
  }

  unlock(){
    this.setState({locked: false, edit: true, modalVisible: false});
  }

  handleInvokeEdit(){
    if(!this.state.edit)
      this.setState({edit: true});
  }

  handleCancel(){
    this.setState({
      _id: this.props.tournament._id || '',
      name: this.props.tournament.name || '',
      dateStart: this.props.tournament.dateStart.replace(/T.*$/, '') || '',
      dateEnd: this.props.tournament.dateEnd.replace(/T.*$/, '') || '',
      nameError: null,
      dateStartError: null,
      dateEndError: null,
      locked: this.props.tournament.locked,
    });
    if (this.state._id) this.toggleEdit();
  }

  clearForm(){
    if (this.props.tournament) return;
    this.setState({
      name: '', 
      dateStart: '', 
      dateEnd: '',
      nameError: null,
      dateStartError: null,
      dateEndError: null,
    });
  }

  handleChange(e){
    let {name, value} = e.target;
    this.setState({
      [name]: name !== 'name' ? value.trim() : value,
      [`${name}Error`]: null,
      error: null,
    });
  }
  
  handleDelete(){
    this.props.deleteTournament(this.state._id)
      .then(() => this.props.selectTournament(''))
      .then(() => this.props.collapseTournament())
      .then(() => this.setState({
        name: '',
        dateStart: '',
        dateEnd: '',
        nameError: null,
        dateStartError: null,
        dateEndError: null,
      }));
  }

  isFormValid(){
    let nameError = !this.state.name.trim() ? 'Tournament name required' : null;
    //new tournaments can't have dates in the past
    let dateStartError = null;
    let dateEndError = null;
    let start = convertDateString(this.state.dateStart);
    let end = convertDateString(this.state.dateEnd);
    if (!this.state._id){
      if (!start || new Date() > start) dateStartError = 'Invalid date';
      if (!end || new Date() > end ) dateEndError = 'Invalid date';
    }

    if (!dateStartError || !dateEndError) {
      dateEndError = start > end ? 'Invalid: date occurs before start': null;
    }

    this.setState({nameError, dateStartError, dateEndError});
    return [nameError, dateStartError, dateEndError].every(error => !error);
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.isFormValid()) return;
    let tournament = {...this.state};
    if (tournament._id === '') delete tournament._id;
    this.props.onComplete(tournament)
      .then(action => this.props.selectTournament(action.payload));
  }

  render(){
    return (
      <React.Fragment>
        <form className={`tournament-form${this.state.edit ? ' edit' : ''}`} onSubmit={this.handleSubmit}>
          
          <input type="text" name="name"
            className={this.state.nameError ? 'error' : ''}
            placeholder="Tournament Name" 
            value={this.state.name} 
            onChange={this.handleChange}
            onDoubleClick={this.handleInvokeEdit}
            readOnly={!this.state.edit}/>

          {this.state.nameError ? <span className="validation-error">{this.state.nameError}</span> : undefined }

          <label>Start Date:</label>

          <input type="date" name="dateStart"
            className={this.state.dateStartError ? 'error' : ''}
            value={this.state.dateStart} 
            onChange={this.handleChange}
            onDoubleClick={this.handleInvokeEdit}
            readOnly={!this.state.edit}
            min={!this.state._id ? new Date().toISOString().replace(/T.*$/, '') : ''}/>

          {this.state.dateStartError ? <span className="validation-error">{this.state.dateStartError}</span> : undefined }

          <label>End Date:</label>

          <input type="date" name="dateEnd"
            className={this.state.dateEndError ? 'error' : ''}
            value={this.state.dateEnd} 
            onChange={this.handleChange}
            onDoubleClick={this.handleInvokeEdit}
            readOnly={!this.state.edit}
            min={!this.state._id ? new Date().toISOString().replace(/T.*$/, '') : ''}/>

          {this.state.dateEndError ? <span className="validation-error">{this.state.dateEndError}</span> : undefined}
          
          <div className="tournament-form-btn-wrap">
            {!this.state.locked ?
              this.state.edit ?
                <React.Fragment>
                  {this.state._id ?
                    <button type="button" name="remove" onClick={this.handleDelete}>Delete</button>
                    : undefined}
                  <button type='submit' name='save'>Save</button>
                  <button onClick={this.handleCancel} type="button" name="cancel" >Cancel</button>
                </React.Fragment>
                : <button type="button" name="edit" onClick={this.toggleEdit}>Edit</button>
              : <button type="button" name="unlock" onClick={this.toggleUnlockModal}>Unlock</button>
            }
          </div>
        </form>
        <UnlockModal 
          cancel={this.toggleUnlockModal}
          unlock={this.unlock}
          isVisible={this.state.modalVisible}/>
      </React.Fragment>
    );
  }
}