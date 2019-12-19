
import React, {Component} from "react";
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PaymentGate from "../payment-gate/paymentGate";



export default class Orders extends Component {
    constructor(props){
    super(props)
        this.state={
            username:this.props.username,
            print_time:'',
            cost:'',
            response:[],
            active_order:[]
            
        }
        
        this.cancelOrder = this.cancelOrder.bind(this)
        
    }


    cancelOrder(event){
        if(confirm("Are You Sure  You Wish To Cancel This Order?")){
            fetch(`http://now.doesntexist.com:5000delete/order/${event.target.value}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json'},
            }).then(response =>{
                response.json().then((body) => {
                    alert("Order Removed")
                    window.location.reload(false)
                })
            })
            .catch(err=>{
                (err)
            })
        }
        else{
            
        }
    }



    
    buildOrders(items){
        if(items.length<1){
            this.setState({
                errText:"No Previous Orders To Display"
            })
            
        }

        for(let ct=0; ct<items.length; ct++){
            let order= items[ct]

            let container = document.createElement("DIV")
            container.className="order"

            
            let num_div = document.createElement("DIV")
            let num = document.createTextNode(ct+1)
            num_div.appendChild(num)



            let material_div = document.createElement("DIV")
            let material = document.createTextNode(`Material: ${order[3]}`)
            material_div.appendChild(material)

            let resolution_div = document.createElement("DIV")
            let resolution = document.createTextNode(`Resolution: ${order[4]}`)
            resolution_div.appendChild(resolution)

            let color_div = document.createElement("DIV")
            let color = document.createTextNode(`Color: ${order[5]}`)
            color_div.appendChild(color)

            let status_div = document.createElement("DIV")
            let status = document.createTextNode(`Status: ${order[9]}`)
            status_div.appendChild(status)

            let order_date_div = document.createElement("DIV")
            let order_date = document.createTextNode(`Order Placed On: : ${order[10]}`)
            order_date.className=`sorder_date_${ct}`
            order_date_div.appendChild(order_date)

            container.appendChild(num_div)
            
            container.appendChild(material_div)
            container.appendChild(resolution_div)
            container.appendChild(color_div)
            container.appendChild(status_div)
            container.appendChild(order_date_div)
            

            if(order[9]=="in progress"){
                let cancel_btn = document.createElement("BUTTON")
                cancel_btn.textContent="Cancel Order"
                cancel_btn.value=order[0]
                cancel_btn.onclick=this.cancelOrder
                container.appendChild(cancel_btn)
            }
            else if(order[9]=="estimate complete"){
                let cancel_btn = document.createElement("BUTTON")
                cancel_btn.textContent="Cancel Order"
                cancel_btn.value=order[0]
                cancel_btn.onclick=this.cancelOrder
                container.appendChild(cancel_btn)


                let purchase_btn = document.createElement("BUTTON")
                purchase_btn.textContent="Proceed With Checkout"
                purchase_btn.value=order[0]
                purchase_btn.onclick=this.props.processOrder

                container.appendChild(purchase_btn)
            }
            else if(order[9]=="print in progress"){
                
                
            }
            else if(order[9]=="completed"){

            }
            else if(order[9]=="rejected"){

            }

            let parent=document.getElementById("orders")
            parent.append(container)

            
        }
    }

  
    

    componentDidMount(){
        fetch(`http://now.doesntexist.com:5000/get/history/${this.state.username}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json'},
        }).then(response =>{
            response.json().then((body) => {
                this.setState({
                    response:body
                })
                this.buildOrders(body)
            })
        })
        .catch(err=>{
            (err)
        })
    }

    render(){
        return(
            <div className="order-history-container">
                {this.state.redirect}
                <div className="orders" id="orders" style={{visibility:this.state.profile_visibility}}>
                    <h3>{this.state.errText}</h3>
                </div>
                <div className="order_details" id="order_details" style={{visibility:this.state.profile_visibility}}>

                </div>
                
            </div>
        )}
}