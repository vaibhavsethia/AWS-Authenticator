import React, { Component } from 'react'
import { AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

export class ConfirmSignUp extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       Code : ''
    }

    this.confirmSignUp = this.confirmSignUp.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);

  }

  async resendConfirmationCode(){
    try {
      await Auth.resendSignUp(this.props.Username);
      console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
  }

  handleFormSubmission(evt) {
    evt.preventDefault();
    this.confirmSignUp();
  }

  async confirmSignUp() {
    const username = this.props.Username;
    const code = this.state.Code;

    try {
      await Auth.confirmSignUp(username, code);
      this.props.SetAuthState(AuthState.SignIn)
    } catch (error) {
        console.log('error confirming sign up', error);
    }
  }
  
  render() {
    return (
      <div className="tc pt5">
        <h2>Verify your Mail Address</h2>
        <div className="pa2">
          <label for="username" className="pr3">UserName</label>
          <input className="ba b--gray br2 pl2 shadow-2" type="text" placeholder={this.props.Username} onChange={(e) => this.setState({Username: e.target.value})} disabled></input>
        </div>
        <div className="pa2">
          <label for="code" className="pr3">Code</label>
          <input className="ba b--gray br2 pl2 shadow-2" type="text" placeholder="Enter Code" onChange={(e) => this.setState({Code: e.target.value})}></input>
        </div>

        <div className="pa2">
          <a className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-green" onClick={this.handleFormSubmission} href="#0">Verify Account</a>
        </div>

        <div>
          Didn't get a Code ? <a className="f5 fw6 dark-green link " onClick={() => this.resendConfirmationCode} href="#0">Resend Code</a>
        </div>
      </div>
    )
  }
}

export default ConfirmSignUp