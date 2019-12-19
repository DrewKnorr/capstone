import React, {Component} from "react";
import OrderHistory from "../order-history/orderHistory";
import PaymentGate from "../payment-gate/paymentGate";


export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:this.props.username,
            email:"",
            fname:"",
            lname:"",
            payment_visibility:"hidden",
            profile_visibility:"visible",
            active_order:0,
            payment_gate:""
        }
        this.handlePurchase = this.handlePurchase.bind(this)
    }

    handlePurchase(event){
        
        this.setState({
            payment_visibility:"visible",
            profile_visibility:"hidden",
            active_order:event.target.value,
            payment_gate:<PaymentGate
                 order={event.target.value}
                 fname={this.state.fname}
                 lname={this.state.lname}
                 />
        })
        ("ACTIVE ORDER",this.state.active_order)
        (typeof(event.target.value))
    }

    componentDidMount(){
        fetch(`http://now.doesntexist.com:5000/profile/${this.state.username}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json'}
        }).then(response =>{
            response.json().then((body) => {
                this.setState({
                    username:body[1],
                    fname:body[2],
                    lname:body[3],
                    email:body[4],
                    active_order:""
                })
                
            })
        })
        .catch(err=>{
            (err)
        })
}
render(){
    return(
        <div className="profile-wrapper">
            <div className="title-wrapper" style={{visibility:this.state.profile_visibility}}>
                <h1>Profile</h1>

                <h3>{`Username: ${this.state.username}`}</h3>
                <h3>{`First Name: ${this.state.fname}`}</h3>
                <h3>{`Last Name: ${this.state.lname}`}</h3>
                <h3>{`Email Address: ${this.state.email}`}</h3>

            </div>
            <div className="edit-user-info">

            </div>
            <div className="order-history-info" style={{visibility:this.state.profile_visibility}}>
                <h4>Orders:</h4>
                <OrderHistory
                    username={this.state.username}
                    processOrder={this.handlePurchase}
                />
            </div>
            <div id="payment-gate-wrapper"className="payment-gate-wrapper" style={{visibility:this.state.payment_visibility}}>
                {this.state.payment_gate}
            </div>
        </div>
    )
}

}