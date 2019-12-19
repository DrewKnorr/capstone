import React, {Component} from "react";
import Requests from "../pm-requests/requests"

export default class PmRequests extends Component {
        constructor(props){
            super(props);
            this.state={

                username:this.props.username
            }
            this.redirect = this.redirect.bind(this);
        }
    
        redirect(){
            this.props.history("/pmRequests")
        }

    render(){
        return(
            <div className="requests-wrapper">
               <Requests
                redirect = {this.redirect}
               />
            </div>
        )
    }

}