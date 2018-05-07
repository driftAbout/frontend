import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {AuthForm} from '../auth';
import {userSignupRequest, userSigninRequest} from '../../actions/signin-signup-actions';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  redirect(path) {
    this.props.history.push(path);
  }

  render () {
    let {params} = this.props.match;
    let onComplete = params.auth === 'signin'
      ? this.props.signin
      : this.props.signup;

    return (
      <div>
        {!localStorage.token ?
          <div className="landing-container">
            <h3>Please {this.props.match.params.auth === 'signin' ? 'Sign In' : 'Sign Up'}</h3>
            <AuthForm
              auth={params.auth}
              history={this.props.history}
              onComplete={onComplete}/>
            {this.props.match.params.auth === 'signin' ?
              <Link className="signup-link" to="/welcome/signup">sign up</Link>
              :undefined}
          </div>
          : undefined}
        <div className="tournament-view-link">
          <Link to="/tournaments"><span>Tournament View</span></Link>
        </div>
      </div>
    );
  }
}

let mapStateToProps = () => ({});
let mapDispatchToProps = dispatch => ({
  signup: user => dispatch(userSignupRequest(user)),
  signin: user => dispatch(userSigninRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
