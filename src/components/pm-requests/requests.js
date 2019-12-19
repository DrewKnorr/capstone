
import React, {Component} from "react";
import { Redirect } from 'react-router-dom'



export default class Requests extends Component {
    constructor(props){
    super(props)
        this.state={
            username:this.props.username,
            response:[],
            active_request:[],
            errText:"",
            redirect:""
            
        }
        this.deleteRequest = this.deleteRequest.bind(this);
        this.approveRequest = this.approveRequest.bind(this);
        this.showRequests = this.showRequests.bind(this);
    }

    deleteRequest(event){
        (event.target.value)
        fetch(`http://now.doesntexist.com:5000delete/pm/request/${event.target.value}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json'},
        }).then(response =>{
            response.json().then((body) => {
                this.setState({
                    response:Object.values(body)[0],
                    errText:Object.values(body)[0]
                   
                })
                window.location.reload(false)
            })
        })
        .catch(err=>{
            (err)
        })
    }
    


    approveRequest(event){
        (event.target.value)

        fetch(`http://now.doesntexist.com:5000approve/pm/request/${event.target.value}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json'},
        }).then(response =>{
            response.json().then((body) => {
                this.setState({
                    response:Object.values(body)[0],
                    errText:Object.values(body)[0]
                })
                window.location.reload(false)
            })
        })
        .catch(err=>{
            (err)
        })
        this.props.redirect()
    }
    
        
    
    
    showRequests(items){
        (this.state.response.length,this.state.response)
        if(this.state.response.length <=0 ){
            this.setState({
                errText:"No Pending Print Master Requests"
            })
        }
        for(let ct=0; ct<items.length; ct++){
            let request= items[ct]
            (request)

            let container = document.createElement("DIV")

            let user_lb = document.createTextNode("User: ")
            let user = document.createTextNode(request[1])

            let printer_lb = document.createTextNode("Printer: ")
            let printer = document.createTextNode(request[3])


            let experiance_lb = document.createTextNode("Experiance: ")
            let experiance = document.createTextNode(`${request[4]} Year('s) Of Experiance`)

            let approve_btn = document.createElement("BUTTON")
            approve_btn.textContent="Approve"
            approve_btn.onclick=this.approveRequest
            approve_btn.value=request[0]

            let decline_btn = document.createElement("BUTTON")
            decline_btn.textContent="Reject"
            decline_btn.value=request[0]
            decline_btn.onclick=this.deleteRequest

            container.appendChild(user_lb)
            container.appendChild(user)
            container.appendChild(printer_lb)
            container.appendChild(printer)
            container.appendChild(experiance_lb)
            container.appendChild(experiance)
            container.appendChild(approve_btn)
            container.appendChild(decline_btn)

            let parent = document.getElementById("requests")
            parent.append(container)
        }
        
    }

  
    

    componentDidMount(){
            fetch(`http://now.doesntexist.com:5000/get/pm/request-queue`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json'},
        }).then(response =>{
            response.json().then((body) => {
                this.setState({
                    response:body
                })
                this.showRequests(body)
            })
        })
        .catch(err=>{
            (err)
        })
        
        
    }

    render(){
        return(
            <div className="request-container">
                {this.state.redirect}
                <h1>Print Master Requests</h1>
                <div id="errText">
                    <h2>{this.state.errText}</h2>
                </div>
                <div id="requests">

                </div>
            </div>
        )}
}