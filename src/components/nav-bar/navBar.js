import React from "react";
import axios from "axios";

import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const NavigationComponent = props => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };

  const handleSignOut = () => {
    ("SIGN OUT")
    (props.history)
    props.history.push('/')
    props.handleSuccessfulLogout()
  };

  return (
    <div className="nav-wrapper">
      <div className="left-side">

        {props.role =="admin" && props.loggedInStatus === true?(
            dynamicLink("/pmRequests","Pending PM")
        ):null}

        {props.role =="admin" && props.loggedInStatus === true?(
            dynamicLink("/userControl","User Control")
        ):null}

        {props.role =="admin" && props.loggedInStatus === true?(
            dynamicLink("/adminOrders","Orders")
        ):null}
        
        {props.role != "admin"? (
          dynamicLink("/", "Home")
          
        ) : null}
        

        {props.loggedInStatus === false? (
          dynamicLink("/printmaster", "Print Masters")
        ) : null}

        {props.loggedInStatus === true && props.role==="user" || props.role ==="print-master"? (
          dynamicLink("/getQuote", "Get Quote")
        ) : null}

        {props.loggedInStatus === true && props.role==="user"? (
          dynamicLink("/printmaster", "Print Masters")
        ) : null}

        {props.loggedInStatus === true && props.role==="print-master"? (
          dynamicLink("/pmDashboard", "Dashboard")
        ) : null}

        {props.loggedInStatus === true && props.role==="print-master"? (
          dynamicLink("/pmOrders", "Orders")
        ) : null}
      </div>

      <div className="right-side">
        {props.role != "admin"? (
          dynamicLink("/aboutUs", "About Us")
          
        ) : null}
        
        {props.loggedInStatus === true && props.role!="admin"? (
          dynamicLink("/userProfile", props.username)
        ) : null}

        {props.loggedInStatus === false ? (
          dynamicLink("/auth", "Login")
        ) : null}
        {props.loggedInStatus === true ? (
          <button type="text" onClick={handleSignOut}>Sign Out</button>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(NavigationComponent);
