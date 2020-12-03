import React, { Component } from 'react'
import { AuthState } from '@aws-amplify/ui-components'

export class index extends Component {
  render() {
    console.log(this.props.User)
    if(this.props.AuthState === AuthState.SignedIn){
      return(
        <div className="tc">
          <h2> AWS Authenticator Tutorial</h2>
          {this.props.User === null ? <div> Loading User </div> :
            <div className="tc w-100">
              <p className=""> Name : {this.props.User['username']}</p>
              <p className=""> Mail : {this.props.User['attributes']['email']}</p>
            </div>
        }
          <a className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-pink" onClick={(e)=>this.props.SetAuthState(AuthState.SignedOut)} href="#0">Sign Out</a>
        </div>
      )
    } else{
      return(
        <div className="tc w-100">
          <h2> AWS Authenticator Tutorial</h2>
          <p> No user Logged in !</p>
          <a className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-green" onClick={(e)=>this.props.SetAuthState(AuthState.SignIn)} href="#0">Login</a>
        </div>
      )
    }
  }
}

export default index
