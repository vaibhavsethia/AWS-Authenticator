import React, { Component } from 'react'
import { Authenticator, SignIn, SignUp} from 'aws-amplify-react/lib/Auth';
import aws_config from './aws-exports'
import './App.css'
import Content from './Components/Content'
import { Auth } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';

import CustomSignIn from './Components/Login/CustomSignIn'
import CustomSignUp from './Components/Login/CustomSignUp'
import ConfirmSignUp from './Components/Login/ConfirmSignUp';
import ForgotPassword from './Components/Login/ForgotPassword';
import ResetPassword from './Components/Login/ResetPassword';

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      AuthState: AuthState.SignedOut,
      User: null,
      SignUpUsername: '',
    }
    
    this.SetUserName = this.SetUserName.bind(this);
    this.SetAuthState = this.SetAuthState.bind(this);
  }

  SetUserName(Val){
    this.setState({
      SignUpUsername: Val,
    })
  }

  SetUser(UserVals){
    this.setState({
      User: UserVals,
    })
  }

   async SetAuthState(Val){
     if(Val === AuthState.SignedOut){
       Auth.signOut();
       this.SetUser(null);
     }
    this.setState({
      AuthState: Val,
    })

    const User = await Auth.currentAuthenticatedUser();
    this.SetUser(User);
  }

  async componentDidMount(){
    const User = await Auth.currentAuthenticatedUser();
    if(User === null){
      this.SetAuthState(AuthState.SignedOut)
    } else{
      this.SetAuthState(AuthState.SignedIn)
    }
  }

  render() {
    if(this.state.AuthState === AuthState.SignedIn){
      return(
        <Content
          AuthState = {this.state.AuthState}
          User = {this.state.User}
          SetAuthState = {this.SetAuthState}
        />
      )
    } else if(this.state.AuthState === AuthState.SignedOut){
        return(
          <Content
            AuthState = {this.state.AuthState}
            User = {null}
            SetAuthState = {this.SetAuthState}
          />
        )
    } else if(this.state.AuthState === AuthState.ConfirmSignUp){
      return(
        <ConfirmSignUp
          SetAuthState={this.SetAuthState} 
          Username={this.state.SignUpUsername}
        />
      )
    } else if(this.state.AuthState === AuthState.ForgotPassword){
      return(
        <ForgotPassword 
          SetAuthState={this.SetAuthState} 
          SetUserName={this.SetUserName}
        />
      )
    } else if(this.state.AuthState === AuthState.ResetPassword){
      return(
        <ResetPassword 
          SignUpUsername={this.state.SignUpUsername}
          SetAuthState={this.SetAuthState} 
        />
      )
    } else{
        return(
          <Authenticator hide={[SignIn, SignUp]} amplifyConfig={aws_config}>
            <CustomSignIn 
              SetAuthState={this.SetAuthState}
            />
            <CustomSignUp
              AuthState = {this.state.AuthState}
              SetAuthState={this.SetAuthState}
              SetUserName={this.SetUserName}
            />  
          </Authenticator>
        )
    }
  }
}

export default (App);
