import { SignIn } from 'aws-amplify-react/lib/Auth';
import React from 'react'
import { AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

export class CustomSignIn extends SignIn {
  constructor(props) {
    super(props)
  
    this.state = {
       Username : '', 
       Password : ''
    }

    this.signIn = this.signIn.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleFormSubmission(evt) {
    evt.preventDefault();
    this.signIn();
  }

  async signIn() {
    const username = this.state.Username;
    const password = this.state.Password;
    try {
      await Auth.signIn(username, password);
      await this.props.SetAuthState(AuthState.SignedIn)
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        this.setState({ error: "Login failed." });
      } else if (err.code === "NotAuthorizedException") {
        this.setState({ error: "Login failed." });
      } else if (err.code === "UserNotFoundException") {
        this.setState({ error: "Login failed." });
      } else {
        this.setState({ error: "An error has occurred." });
        console.error(err);
      }
    }
  }
  
  showComponent(theme) {
    return (
      <div className="tc pt5">
        <h2>Sign in to your Account</h2>
        <div className="pa2">
          <label for="username" className="pr3">UserName</label>
          <input className="ba b--gray br2 pl2 shadow-2" type="text" placeholder="Username" onChange={(e) => this.setState({Username: e.target.value})}></input>
        </div>
        <div className="pa2">
          <label for="password" className="pr3">Password</label>
          <input className="ba b--gray br2 pl2 shadow-2" type="password" placeholder="Password" onChange={(e) => this.setState({Password: e.target.value})}></input>
        </div>

        <div className="pa2">
          <a className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-green" onClick={this.handleFormSubmission} href="#0">Sign In</a>
        </div>

        <div className="pa2">
          Not a User ? <a className="f5 fw6 dark-green link " onClick={() => super.changeState("signUp")} href="#0">Register Now !</a>
        </div>
        <div className="pa2">
          Do not remember password ? <a className="f5 fw6 dark-green link " onClick={() => this.props.SetAuthState(AuthState.ForgotPassword)} href="#0">Forgot Password</a>
        </div>
      </div>
    )
  }
}

export default CustomSignIn
