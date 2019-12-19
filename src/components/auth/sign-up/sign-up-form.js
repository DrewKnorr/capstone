import React, { Component } from "react";
import { Redirect } from 'react-router-dom'


export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password_verify: "",
      fname:"",
      lname:"",
      email:"",
      errorText: "",
      redirect:""
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
    
    if(this.state.password === this.state.password_verify){
      fetch("http://now.doesntexist.com:5000/user/new", {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username:this.state.username,
                    fname:this.state.fname,
                    lname:this.state.lname,
                    email: this.state.email,
                    password: this.state.password
                })
            })
      .then(response => {
        this.setState({
          username: "",
          password: "",
          password_verify: "",
          email:"",
          fname:"",
          lname:"",
          errorText: "",
          redirect:<Redirect to='/' />
        })
        this.props.handleSucessfulUser
      })
      .catch(error =>{
        console.log("ERROR CREATING USER: ",error)
      })

            
    }
    else{
      this.setState({
        
        errorText: "Passwords Do Not Match"
      });
    }
    
    event.preventDefault();
  }

  render() {
    return (
      <div className="new-user-wrapper">
        {this.state.redirect}
        <h1>Create New User</h1>

        <div>{this.state.errorText}</div>

        <form className="new-user-form" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            value={this.state.fname}
            onChange={this.handleChange}
          />
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={this.state.lname}
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

          <label htmlFor="verify-password">Verify Password:</label>
          <input
            type="password"
            name="password_verify"
            placeholder="Your password"
            value={this.state.password_verify}
            onChange={this.handleChange}
          />

          <div>
            <button type="submit">Create User</button>
          </div>
        </form>

      </div>
    );
  }
}