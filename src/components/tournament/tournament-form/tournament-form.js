import React from 'react';

export default class TournamentForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      dateStart: '',
      dateEnd: '',
      edit: false,
    };
    this.handleChange =  this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleInvokeEdit = this.handleInvokeEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.tournament) return this.setState({name: '', dateStart: '', dateEnd: '', _id: '', edit: true});
    this.setState({
      _id: nextProps.tournament._id,
      name: nextProps.tournament.name,
      dateStart: nextProps.tournament.dateStart ? nextProps.tournament.dateStart.replace(/T.*$/, '') : '',
      dateEnd: nextProps.tournament.dateEnd ? nextProps.tournament.dateEnd.replace(/T.*$/, '') : '',
      edit: false,
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
    this.setState({
      _id: this.props.tournament._id || '',
      name: this.props.tournament.name || '',
      dateStart: this.props.tournament.dateStart || '',
      dateEnd: this.props.tournament.dateEnd || '',
    });
    this.toggleEdit();
  }

  clearForm(){
    if (this.props.tournament) return;
    this.setState({name: '', director: '', dateStart: '', dateEnd: ''});
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleDelete(){
    this.props.deleteTournament(this.state._id)
      .then(() => this.props.selectTournament(''))
      .then(() => this.props.collapseTournament())
      .then(() => this.setState({name: '', director: '', dateStart: '', dateEnd: ''}));
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.state.name) return;
    let tournament = {...this.state};
    if (tournament._id === '') delete tournament._id;
    this.props.onComplete(tournament)
      .then(action => this.props.selectTournament(action.payload));
  }

  render(){
    return (
      <form className={`tournament-form${this.state.edit ? ' edit' : ''}`} onSubmit={this.handleSubmit}>
        
        <input type="text" name="name"
          placeholder="Tournament Name" 
          value={this.state.name} 
          onChange={this.handleChange}
          onDoubleClick={this.handleInvokeEdit}
          readOnly={!this.state.edit}/>

        <label>Start Date:</label>

        <input type="date" name="dateStart" 
          value={this.state.dateStart} 
          onChange={this.handleChange}
          onDoubleClick={this.handleInvokeEdit}
          readOnly={!this.state.edit}/>

        <label>End Date:</label>

        <input type="date" name="dateEnd"
          value={this.state.dateEnd} 
          onChange={this.handleChange}
          onDoubleClick={this.handleInvokeEdit}
          readOnly={!this.state.edit}/>
        
        <div className="tournament-form-btn-wrap">
          {this.state.edit ?
            <React.Fragment>
              {this.state._id ?
                <button type="button" name="remove" onClick={this.handleDelete}>Delete</button>
                : undefined}
              <button type='submit' name='save'>Save</button>
              <button onClick={this.handleCancel} type="button" name="cancel" >Cancel</button>
            </React.Fragment>
            : <button type="edit" name="edit" onClick={this.toggleEdit}>Edit</button>}
        </div>
      </form>
    );
  }
}