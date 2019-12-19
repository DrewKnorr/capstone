import React, {Component} from "react";
import PMSignUp from "../auth/sign-up/pmSignUpForm"
import { NavLink } from "react-router-dom";

import Hobbiest from "../../../static/assets/images/print-master/hobbiest.jpg"
import Staff from "../../../static/assets/images/print-master/staff.jpg"
import PMImg from "../../../static/assets/images/print-master/pm-img.jpg"



export default class Auth extends Component {

  constructor(props) {
    super(props);
    this.state={
      username:this.props.username,
      in_queue:false,
      hide_form:"hidden",
      loggedin_status:this.props.status,
      hide_login:"visible",
      redirect:""
    }
  
  }

 
  

  componentDidMount(){
    if(this.state.loggedin_status == true){
      this.setState({
        hide_login:"hidden"
      })
    }
    
    fetch(`http://now.doesntexist.com:5000/check/pm/${this.state.username}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json'},
    }).then(response =>{
        response.json().then((body) => {
          if(Object.values(body)[0] == true){
            this.setState({
              in_queue:Object.values(body)[0],
              hide_form:"hidden",
              hide_login:"hidden"
            })
          }
          else{
            
            this.setState({
              in_queue:Object.values(body)[0],
              hide_form:"visible"
            })
          }
        })
    })
    .catch(err=>{
        (err)
    })
}

  render() {
    
    return (
      <div className="pm-page-wrapper">
        <div className="pm-left-column">
            <h1>Who Are The Print Master's?</h1>
            <div className="pm-text-container">
              <h4>Short Answer Is ... Its You</h4>
              <p>Our print masters are indaviuals who want to take there hobby to the next level.
                 Anyone with a 3D Printer can requests to become a print master today. After our staff reviews your reuquest you'll be notified 
                 if you've been approved or not!
              </p>
              <img src={Hobbiest} />
            </div>
            <div className="pm-text-container">
              <h4>What It Takes</h4>
              <p>
                Our staff reviews all applications to become printmasters and the things we look for are:
              </p>
              <p>
                1: You have a 3D printer!
              </p>
              <p>
                2: You have experiance using your printer and are able to print with minimal errors 
              </p>
              <p>
                If both of those requirements then you will be approved and become part of the WE3D family
              </p>
              <img src={Staff}/>
            </div>
            
            <div className="pm-text-container">
              <h4>What Being  A Print Master Means</h4>
              <p>It means its now your job to bring to life the items our users need!</p>
              <img src={PMImg}/>
            </div>
            
        </div>

        <div className="pm-right-column" style={{visibility:this.state.hide_form}}>
          <PMSignUp
            username={this.state.username}
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
          />
          <div className="pm-login-container" style={{visibility:this.state.hide_login}}>
              <h2>Login To Your Profile To Apply Now!</h2>
              <div className="login-link-wrapper">
                  <NavLink exact to="/auth" activeClassName="nav-link">Click Here To Login</NavLink>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
