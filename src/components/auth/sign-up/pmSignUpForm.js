import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

export default class PMSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      password: "",
      password_verify: "",
      printer:"prusa_fdm",
      experiance:"0",
      errorText: "",
      hidden_inpt:"hidden",
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
      if (this.state.printer=="other_fdm" || this.state.printer=="other_sla"){
        this.setState({
          hidden_inpt:"visible"
        })
      }
  }



  handleSubmit(event) {
    
    
    fetch("http://now.doesntexist.com:5000/post/pm/user", {
              method: "POST",
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify({
                  username:this.state.username,
                  password: this.state.password,
                  printer:this.state.printer,
                  experiance:this.state.experiance
              })
          })
    .then(response => {
      
      this.setState({
        username: "",
        password: "",
        password_verify: "",
        errorText: "",
        redirect:<Redirect to='/' />
      })
    })
    .catch(error =>{
      console.log("ERROR CREATING USER: ",error)
    })

            
    


    event.preventDefault();
    
  }

  render() {
    return (
      <div className="pm-signup-container">
        {this.state.redirect}
        <h1>Sign Up To Become A  Print Master Today!</h1>

        <div>{this.state.errorText}</div>

        <form className="new-pm-form" onSubmit={this.handleSubmit}>
          <h3>{`Username: ${this.state.username}`}</h3>
          

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <label htmlFor="printer">Type Of Printer:</label>
          <select name="printer" className="printer" onChange={this.handleChange}>
              <option name="printer" value="prusa_fdm"> Prusa FDM</option>
              <option name="printer" value="prusa_sla"> Prusa SLA</option>
              <option name="printer" value="creality_fdm"> Creality FDM</option>
              <option name="printer" value="ultimaker_fdm"> Ultimaker FDM</option>
              <option name="printer" value="other_fdm"> Other FDM</option>
              <option name="printer" value="other_sla"> Other SLA</option>
          </select>
          <input
            type="text"
            name="printer"
            placeholder="Printer Name"
            value={this.state.printer}
            onChange={this.handleChange}
            style={{visibility:this.state.hidden_inpt}}
          />

          <label htmlFor="experiance">Years Of Experaince:</label>
          <select name="experiance" className="experiance" onChange={this.handleChange}>
              <option name="experiance" value="0"> Less Than 1 Year</option>
              <option name="experiance" value="1">1 Year</option>
              <option name="experiance" value="2">2 Years</option>
              <option name="experiance" value="3">3 Years</option>
              <option name="experiance" value="4">4 Years</option>
              <option name="experiance" value="5">5 Years</option>
              <option name="experiance" value="6"> Grater Than 5 Years</option>
          </select>


          <div>
            <button type="submit">Place Request</button>
          </div>
        </form>

      </div>
    );
  }
}