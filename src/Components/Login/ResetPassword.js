import React, { Component } from 'react'
import { AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

export class ResetPassword extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       Username : '',
       Password : '',
       Code : '',
       RePassword : '', 
    }

    this.resetPassword = this.resetPassword.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleFormSubmission(evt) {
    if(this.state.Password === this.state.RePassword && this.state.Password != ''){
      evt.preventDefault();
      this.resetPassword();
    } else{
      console.log("Passwords did not match")
    } 
  }

  async resetPassword() {
    const username = this.props.SignUpUsername;
    const code = this.state.Code
    const password = this.state.Password

    try{
      await Auth.forgotPasswordSubmit(username, code, password)
      this.props.SetAuthState(AuthState.SignIn)
    } catch(err){
      console.log(err)
    }
  }

  render() {
    return (
      <div className="tc pt5">
        <h2>Reset Password</h2>
        <div className="pa2">
          <label for="username" className="pr3">UserName</label>
          <input className="ba b--gray br2 pl2 shadow-2" type="text" placeholder={this.props.SignUpUsername} onChange={(e) => this.setState({Username: e.target.value})} disabled></input>
        </div>
        <div className="pa2">
          <label for="mail" className="pr3">Code</label>
          <input className="ba b--gray br2 pl2 shadow-2" type="text" placeholder="Enter Code" onChange={(e) => this.setState({Code: e.target.value})}></input>
        </div>
        <div className="pa2">
          <label for="password" className="pr3">Password</label>
          <input className="ba b--gray br2 pl2 shadow-2" type="password" placeholder="Password" onChange={(e) => this.setState({Password: e.target.value})}></input>
        </div>
        <div className="pa2">
          <label for="password" className="pr3">Re-Type Password</label>
          <input className="ba b--gray br2 pl2 shadow-2" type="password" placeholder="Re-Type Password" onChange={(e) => this.setState({RePassword: e.target.value})}></input>
        </div>

        <div className="pa2">
          <a className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-green" onClick={this.handleFormSubmission} href="#0">Reset Password</a>
        </div>
      </div>
    )
  }
}

export default ResetPassword