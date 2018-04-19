import React from 'react';
import {renderIf} from '../../lib/utils';
import {Redirect} from 'react-router-dom';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      username: '',
      notification: true,
      fullnameError: null,
      emailError: null,
      passwordError: null,
      usernameError: null,
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth !== this.props.auth) 
      this.setState({
        fullname: '',
        email: '',
        password: '',
        username: '',
        notification: true,
        fullnameError: null,
        emailError: null,
        passwordError: null,
        usernameError: null,
        error: null,
      });
  }

  handleChange(e) {
    let {name, value} = e.target;
    this.setState({
      [name]: name !== 'fullname' ? value.trim() : value,
      [`${name}Error`]: null,
      error: null,
    });
  }

  isFormValid(){
    if(this.props.auth === 'signin'){
      let usernameError = !this.state.username ? 'Username required' : null;
      let passwordError = !this.state.password ? 'Password required' : null;
      this.setState({usernameError, passwordError});
      return [usernameError, passwordError].every(error => !error);
    }

    let fullnameError = !this.state.fullname.trim() ? 'Name required' : null;
    let emailError = !this.state.email ? 'Email required' : null;
    let passwordError = !this.state.password ? 'Password required' : null;

    if (!emailError) {
      let emailRegex = /^[^@]+@[^.]+\..+$/;
      emailError = !emailRegex.test(this.state.email) ? 'invalid email' : null;
    }
    
    if (!passwordError) {
      passwordError = this.state.password.length < 8 || this.state.password.length > 16 ?
        'Password must be between 8 and 16 characters'
        : null;
    }

    this.setState({fullnameError, passwordError, emailError});

    return [fullnameError, emailError, passwordError].every(error => !error);
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.isFormValid()) return;
    let { fullname, email, password, notification, username } = this.state;
    fullname = fullname.trim();
    this.props.onComplete({ fullname, email, password, notification, username })
      .then(() => this.setState({ fullname: '', email: '', password: '' }))
      .catch(error => this.setState({error}));
  }

  render() {
    if (localStorage.token) return <Redirect to='/admin' />;
    return (
      <form
        className="auth-form"
        onSubmit={this.handleSubmit}
        noValidate>

        { this.props.auth === 'signup' ?
          <React.Fragment>
            {this.state.error ? <span className="signin-error">Account already associated with this email</span> : undefined}
            <input
              className={this.state.fullnameError || this.state.error ? 'error' : ''}
              type="text"
              name="fullname"
              placeholder="Enter fullname"
              value={this.state.fullname}
              onChange={this.handleChange}/>
     
            {renderIf(this.state.fullnameError, <span className="validation-error">{this.state.fullnameError}</span>)}

            <input
              className={this.state.emailError || this.state.error ? 'error' : ''}
              type="email"
              name="email"
              placeholder="user@email.com"
              value={this.state.email}
              onChange={this.handleChange}/>

            {renderIf(this.state.emailError, <span className="validation-error">{this.state.emailError}</span>)}

          </React.Fragment>
          : 
          <React.Fragment>
            {this.state.error ? <span className="signin-error">Invalid username or password</span> : undefined}
            <input
              className={this.state.usernameError || this.state.error ? 'error' : ''}
              type='email'
              name="username"
              placeholder="Email"
              value={this.state.username}
              onChange={this.handleChange}/>
          </React.Fragment>
        }

        {renderIf(this.state.usernameError, <span className="validation-error">{this.state.usernameError}</span>)}

        <input
          className={this.state.passwordError || this.state.error ? 'error' : ''}
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleChange}/>

        {renderIf(this.state.passwordError, <span className="validation-error">{this.state.passwordError}</span>)}

        <div className="auth-form-btn-wrap">
          <button type="submit">{this.props.auth === 'signin' ? 'sign in' : 'sign up'}</button>
        </div>
      </form>
    );
  }
}
