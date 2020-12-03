
import { SignUp } from 'aws-amplify-react/lib/Auth';
import React from 'react'
import { AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

export class CustomSignUp extends SignUp {
  constructor(props) {
    super(props)
  
    this.state = {
      Username : '',
      Password : '', 
      RePassword: '',
      Mail: '',
      User : null,
    }

    this.signUp = this.signUp.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleFormSubmission(evt) {
    if(this.state.Password === this.state.RePassword && this.state.Password !== ''){
      evt.preventDefault();
      this.signUp();
    } else{
      console.log("Passwords did not match")
    } 
  }

  async signUp() {
    const username = this.state.Username;
    const password = this.state.Password;
    const email = this.state.Mail;

    try {
      const { user } = await Auth.signUp({
        username, password, 
        attributes: {
          email,
        }
      });

      this.props.SetUserName(user['username'])
      this.props.SetAuthState(AuthState.ConfirmSignUp)
      
    } catch (err) {
      if (err.code === "UsernameExistsException") {   //Username already taken
        //Shows signup error
      }else if(err.code === ""){   //password too weak
          // show the error
      }
       else {
        this.setState({ error: "An error has occurred." });
        console.error(err);
        this.props.SetAuthState(AuthState.ConfirmSignUp)
      }
    }
  }
  
  showComponent(theme) {
    return (
      <div className="tc pt5">
        <h2>Sign up with a new Account</h2>
        <div className="pa2">
          <label for="username" className="pr3">UserName</label>
          <input className="ba b--gray br2 pl2 shadow-2" type="text" placeholder="Username" onChange={(e) => this.setState({Username: e.target.value})}></input>
        </div>
        <div className="pa2">
          <label for="username" className="pr3">Email</label>
          <input className="ba b--gray br2 pl2 shadow-2" type="email" placeholder="Email" onChange={(e) => this.setState({Mail: e.target.value})}></input>
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
          <a className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-green" onClick={this.handleFormSubmission} href="#0">Sign Up</a>
        </div>
      </div>
    )
  }
}

export default CustomSignUp