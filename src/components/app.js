import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import Admin from "./pages/admin";
import AdminOrders from "./admin-pages/adminOrders"
import Auth from "./pages/auth";
import AboutUs from "./pages/aboutUs";

import GetQuote from "./pages/getQuote";

import Home from "./pages/home";

import PrintMaster from "./pages/printmaster";
import PMOrders from "./pages/pmOrders";
import PMDashboard from "./pages/pmDashboard";
import PMRequests from "./admin-pages/pmRequests";
import Profile from "./pages/userProfile";

import SignUp from "./pages/sign_up"


import UserControl from "./admin-pages/userControl"




//Nav Bar
import NavBar from "./nav-bar/navBar"



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: false,
      role : "user",
      username: ""
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    
  }

  handleSuccessfulLogin(response) {
   
    this.setState({
      loggedInStatus: true,
      role: response.role,
      username:response.username
    });

  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: false,
      role:'user',
      username:''
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: false,
      role:'user',
      username:''
    });
  }

  

  authedUserPages(){
    return [
      <Route
        key="getQuote"
        path="/getQuote"
        render={props =>(
          <GetQuote 
            {...props}
            username = {this.state.username}
            role = {this.state.role}

          />
          )}
      />
    ];
  }

  

  authdAdminPages(){
    return [
      <Route
        key="pmRequests"
        path="/pmRequests"
        render={props =>(
          <PMRequests 
            {...props}
            username = {this.state.username}
            role = {this.state.role}

          />
          )}
      />,
      <Route
        key="adminOrders"
        path="/adminOrders"
        render={props =>(
          <AdminOrders 
            {...props}
            username = {this.state.username}
            role = {this.state.role}

          />
          )}
      />,
      <Route
        key="userControl"
        path="/userControl"
        render={props =>(
          <UserControl 
            {...props}
            username = {this.state.username}
            role = {this.state.role}

          />
          )}
      />
      
    ];
  }

  authedPMPages(){
    return [
      <Route
        key="pmOrders"
        path="/pmOrders"
        render={props =>(
          <PMOrders 
            {...props}
            username = {this.state.username}
            role = {this.state.role}

          />
          )}
      />,
      <Route
        key="getQuote"
        path="/getQuote"
        render={props =>(
          <GetQuote 
            {...props}
            username = {this.state.username}
            role = {this.state.role}

          />
          )}
      />
    ];
  }


  
  render() {
    return (
      <div className='app'>

        
        <div className='content-wrapper'>
          <NavBar 
            loggedInStatus={this.state.loggedInStatus}
            role={this.state.role}
            username={this.state.username}
            handleSuccessfulLogout={this.handleSuccessfulLogout}
          />
          <Route exact path="/" component={Home}/>


          <Route path="/pmRequets" component={PMRequests} />
          <Route 
                path="/admin"
                render={props => (
                  <Admin
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
          />
          <Route
                path="/auth"
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
          />
          <Route path="/aboutUs" component={AboutUs}/>
          
          {this.state.loggedInStatus === true && this.state.role ==="user"
          ? this.authedUserPages()
          :null}
          {this.state.loggedInStatus === true && this.state.role==="admin"
          ? this.authdAdminPages()
          :null}

          <Route 
            path="/printmaster" 
            render={props => (
            <PrintMaster
              {...props}
              username={this.state.username}
              status={this.state.loggedInStatus}
            />
            )}
          />
          
          {this.state.loggedInStatus === true && this.state.role ==="print-master"
          ? this.authedPMPages()
          :null}
          <Route 
            path="/pmDashboard"
            render={props => (
                  <PMDashboard
                    {...props}
                    username={this.state.username}
                  />
                )}
            />
          <Route 
            path="/userProfile" 
            render={props => (
                  <Profile
                    {...props}
                    username={this.state.username}
                  />
                )}
          />
          <Route 
            path="/sign_up"
            render={props =>(
              <SignUp
                {...props}
                
              />
            )}
          />
          

        </div>
    </div>
    );
  }
}
