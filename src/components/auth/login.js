import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as  Route } from "react-router-dom";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  }

 

  handleSubmit(event) {

      fetch("http://now.doesntexist.com:5000/user/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username:this.state.username,
                    password: this.state.password
                })
            }).then((response) => {
              response.json().then((body) => {
                  let values = Object.values(body)
                  (values)
                  if(Object.keys(body)[0]=="errText"){
                    this.setState({
                      errorText:Object.values(body)
                    })
                  }
                  else{
                    
                    
                    this.props.handleSuccessfulAuth(body);
                    
                    
                  }
              });
            })
               

    event.preventDefault();
  }
      


  render() {
    return (
      <div className="login-wrapper">

        <form className="login-form" onSubmit={this.handleSubmit}>
          <h4>LOGIN TO ACCESS YOUR DASHBOARD</h4>

          <div>{this.state.errorText}</div> 
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <div>
            <button type="submit">Login</button>
          </div>
          <div className="signup-link-wrapper">
            <NavLink exact to="/sign_up"  activeClassName="nav-link">Dont Have An Account? Click Here To Sign Up Now!</NavLink>
          </div>
        </form>
      </div>
    );
  }
}