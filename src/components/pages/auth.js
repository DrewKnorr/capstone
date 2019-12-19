import React, {Component} from "react";
import Login from "../auth/login"



export default class Auth extends Component {

  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
 

  }

  handleSuccessfulAuth(response) {
    
    this.props.handleSuccessfulLogin(response);
    this.props.history.push("/")
  }


  render() {
    return (
      <div className="auth-page-wrapper">
        <div
          className="left-column"
        />

        <div className="right-column">
          <Login
            handleSuccessfulAuth={this.handleSuccessfulAuth}

          />
        </div>
      </div>
    );
  }
}
