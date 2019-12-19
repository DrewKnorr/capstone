
import React, {Component} from "react";
import {
    PieChart, Pie, Sector, Cell,
  } from 'recharts';


export default class UserControl extends Component {
    constructor(props){
    super(props)
        this.state={
            username:this.props.username,
            print_time:"",
            cost:"",
            response:[],
            active_order:[],
            errText:"",
            users_data:""
            
        }
        this.buildUserTableSupport=this.buildUserTableSupport.bind(this);
        this.buildUserTableUsers=this.buildUserTableUsers.bind(this);
        this.buildUser=this.buildUser.bind(this);
        this.authEmail = this.authEmail.bind(this);
        
        this.fetchStandardUsers = this.fetchStandardUsers.bind(this);
        this.fetchSupportUsers = this.fetchSupportUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.deleteAdminUser = this.deleteAdminUser.bind(this);
    }

    authEmail(event){
        (event.target.value)
        fetch(`http://now.doesntexist.com:5000/auth/email/${event.target.value}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json'},
        }).then(response =>{
            response.json().then((body) => {
                this.setState({
                    errText:Object.values(body)[0]
                })
                (body)
            })
        })
        .catch(err=>{
            (err)
        })
    }

    deleteUser(event){
        
        if(confirm("Are You Sure You Wish To Delete User?")){
            fetch(`http://now.doesntexist.com:5000/delete/user/${event.target.value}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json'},
            }).then(response =>{
                response.json().then((body) => {
                    this.setState({
                        errText:Object.values(body)[0]
                    })
                    (body)
                })
            })
            .catch(err=>{
                (err)
            })
        }
        else{
            
        }
    }

    deleteAdminUser(event){
        
        if(confirm("Are You Sure  You Wish To Delete Admin User?")){
            fetch(`http://now.doesntexist.com:5000/delete/admin/${event.target.value}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json'},
            }).then(response =>{
                response.json().then((body) => {
                    this.setState({
                        errText:Object.values(body)[0]
                    })
                    (body)
                })
            })
            .catch(err=>{
                (err)
            })
        }
        else{
            
        }
    }

    buildUser(user){
        
        let user_div = document.createElement("DIV")
        let parent_div = document.getElementById("users")
        user_div.className="user_wrapper"
        (this.state)
        let username_lb = document.createTextNode(`${user[1]}`)
        let username_div = document.createElement("DIV")
        let fname_lb = document.createTextNode(`${user[3]}`)
        let fname_div =document.createElement("DIV")
        let lname_lb = document.createTextNode(`${user[4]}`)
        let lname_div = document.createElement("DIV")
        let email_lb = document.createTextNode(`${user[5]}`)
        let email_div =document.createElement("DIV")
        let role_lb = document.createTextNode(`${user[6]}`)
        let role_div =document.createElement("DIV")


        let delete_btn = document.createElement("BUTTON")
        delete_btn.textContent="Delete User"
        delete_btn.onclick=this.deleteUser
        delete_btn.value=user[0]
        let delete_div = document.createElement("DIV")
        delete_div.appendChild(delete_btn)

      

        let auth_btn = document.createElement("BUTTON")
        auth_btn.textContent="Auth Email"
        auth_btn.vlaue=user[0]
        let auth_div = document.createElement("DIV")
        auth_div.appendChild(auth_btn)

        username_div.appendChild(username_lb)
        fname_div.appendChild(fname_lb)
        lname_div.appendChild(lname_lb)
        email_div.appendChild(email_lb)
        role_div.appendChild(role_lb)

        user_div.appendChild(username_div)
        user_div.appendChild(fname_div)
        user_div.appendChild(lname_div)
        user_div.append(email_div)
        user_div.appendChild(role_div)
        user_div.appendChild(delete_div)
        user_div.appendChild(auth_div)

        return parent_div.appendChild(user_div)
    }


    buildSupport(user){
        
        let user_div = document.createElement("DIV")
        let parent_div = document.getElementById("support")
        user_div.className="user_wrapper"

        let username_lb = document.createTextNode(`${user[1]}`)
        let username_div = document.createElement("DIV")
        let fname_lb = document.createTextNode(`${user[3]}`)
        let fname_div =document.createElement("DIV")
        let lname_lb = document.createTextNode(`${user[4]}`)
        let lname_div = document.createElement("DIV")
        let email_lb = document.createTextNode(`${user[5]}`)
        let email_div =document.createElement("DIV")
        let role_lb = document.createTextNode(`${user[6]}`)
        let role_div =document.createElement("DIV")

        let delete_btn = document.createElement("BUTTON")
        delete_btn.textContent="Delete User"
        delete_btn.onclick=this.deleteAdminUser
        delete_btn.value=user[0]
        let delete_div = document.createElement("DIV")
        delete_div.appendChild(delete_btn)



       

        username_div.appendChild(username_lb)
        fname_div.appendChild(fname_lb)
        lname_div.appendChild(lname_lb)
        email_div.appendChild(email_lb)
        role_div.appendChild(role_lb)

        user_div.appendChild(username_div)
        user_div.appendChild(fname_div)
        user_div.appendChild(lname_div)
        user_div.append(email_div)
        user_div.appendChild(role_div)
        user_div.appendChild(delete_div)
        

        return parent_div.appendChild(user_div)
    }

    buildUserTableUsers(items){
            
        for(let ct=0; ct< items.length; ct++){
            let user = items[ct];
            this.buildUser(user)
        }
    }

   buildUserTableSupport(items){
        for(let ct=0; ct< items.length; ct++){
            let user = items[ct];
            this.buildSupport(user)
        }
    }
    

    fetchSupportUsers(){
        fetch(`http://now.doesntexist.com:5000/get/all/support/users`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json'},
        }).then(response =>{
            response.json().then((body) => {
            this.buildUserTableSupport(body)
            })
        })
        .catch(err=>{
            (err)
        })
    }
  
    fetchStandardUsers(){
        fetch(`http://now.doesntexist.com:5000/get/all/users`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json'},
        }).then(response =>{
            response.json().then((body) => {
            this.buildUserTableUsers(body)
            })
        })
        .catch(err=>{
            (err)
        })
    }

    componentDidMount(){
        this.fetchStandardUsers()
        this.fetchSupportUsers()
    }

    render(){
        return(
            <div className="user-control-container">

                <div className="all-users" id="all-users">
                    <h1>User Control</h1>
                    <h2>{this.state.errText}</h2>
                    <h3>Standard Users:</h3>
                    <div className="users-container">
                        <div className="users" id="users">
                            
                            <div className="user_wrapper">
                                <div>Username:</div>
                                <div>First Name:</div>
                                <div>Last Name:</div>
                                <div>Email Address:</div>
                                <div>Role:</div>
                                <div></div>
                                <div></div>
                                
                            </div>

                        </div>
                    </div>
                    <h3>Support Staff:</h3>
                    <div className="support-container">
                        <div className="support" id="support">
                            <div className="user_wrapper">
                                <div>Username:</div>
                                <div>First Name:</div>
                                <div>Last Name:</div>
                                <div>Email Address:</div>
                                <div>Role:</div>
                                <div></div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )}
}