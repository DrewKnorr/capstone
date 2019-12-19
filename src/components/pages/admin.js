import React, {Component} from "react";
import AdminForm from "../auth/admin-login"



export default class Admin extends Component {

  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    
  }

  handleSuccessfulAuth(response) {
    
    this.props.handleSuccessfulLogin(response);
    this.props.history.push("/adminOrders")
  }

  

  render() {
    return (
      <div className="admin-auth-page-wrapper">
        <div className="center-column">
          <AdminForm
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
          />
        </div>
      </div>
    );
  }
}
