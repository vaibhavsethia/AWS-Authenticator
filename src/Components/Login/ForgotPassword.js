import React, { Component } from 'react'
import { AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

export class ForgotPassword extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      Username : '',
    }

    this.forgotPassword = this.forgotPassword.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  async resendConfirmationCode(){
    try {
      await Auth.resendSignUp(this.state.Username);
      console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
  }

  handleFormSubmission(evt) {
    evt.preventDefault();
    this.forgotPassword();
  }

  async forgotPassword() {
    const username = this.state.Username;

    try{
      await Auth.forgotPassword(username)
      this.props.SetUserName(username)
      this.props.SetAuthState(AuthState.ResetPassword)
    } catch(err){
      console.log(err)
    }
  }

  render() {
    return (
      <div className="tc pt5">
        <h2>Forgot Password</h2>
        <div className="pa2">
          <label for="username" className="pr3">UserName</label>
          <input className="ba b--gray br2 pl2 shadow-2" type="text" placeholder="Username" onChange={(e) => this.setState({Username: e.target.value})}></input>
        </div>

        <div className="pa2">
          <a className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-green" onClick={this.handleFormSubmission} href="#0">Send OTP</a>
        </div>
      </div>
    )
  }
}

export default ForgotPassword