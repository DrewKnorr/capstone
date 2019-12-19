
import React, {Component} from "react";



export default class AdminOrders extends Component {
    constructor(props){
    super(props)
        this.state={
            username:this.props.username,
            print_time:"",
            cost:"",
            response:[],
            active_order:[],
            errText:""
            
        }
        this.editOrder = this.editOrder.bind(this)

    }



    editOrder(event){
        
        let order_details=this.state.response[event.target.value]
        
        
        this.setState({
            active_order:order_details
        })

        (this.state)
        const orderWrapper = document.getElementById("active-order-details")
        
        
        if(document.getElementById("edit_order_container")!=null){
            let old =document.getElementById("edit_order_container")
            old.remove()
        }

        let edit_order_container = document.createElement("DIV")
        edit_order_container.id="edit_order_container"

        let username_lb= document.createTextNode(`Customers Username: ${order_details[1]}`)
        let filename_lb= document.createTextNode(`Filename: ${order_details[3]}`)
        let material_lb = document.createTextNode(`Material: ${order_details[4]}`)
        let resolution_lb = document.createTextNode(`Resolution: ${order_details[5]}`)
        let color_lb = document.createTextNode(`Material: ${order_details[6]}`)
        let print_time_lb = document.createTextNode(`Print Time Estimate: ${order_details[8]}`)
        let cost_lb = document.createTextNode(`Estimate Cost: $${order_details[9]}`)
        
        let download_btn = document.createElement("BUTTON")
        download_btn.textContent=`Download Files`

        let edit_print_time_btn = document.createElement("BUTTON")
        edit_print_time_btn.textContent=`Edit PT Estimate`

        let edit_cost_btn = document.createElement("BUTTON")
        edit_cost_btn.textContent=`Edit Cost Estimate`

        let submit_btn = document.createElement("BUTTON")
        submit_btn.textContent=`SUMBIT CHANGES`
        
        
        

        edit_order_container.appendChild(username_lb)
        edit_order_container.appendChild(filename_lb)
        edit_order_container.appendChild(download_btn)
        edit_order_container.appendChild(material_lb)
        edit_order_container.appendChild(resolution_lb)
        edit_order_container.appendChild(color_lb)
        edit_order_container.appendChild(print_time_lb)
        edit_order_container.appendChild(edit_print_time_btn)
        edit_order_container.appendChild(cost_lb)
        edit_order_container.appendChild(edit_cost_btn)
        edit_order_container.appendChild(submit_btn)



        orderWrapper.appendChild(edit_order_container)
        
    }
    
    buildOrders(items){
        for(let ct=0; ct<items.length; ct++){
            let order= items[ct]
            (order)

            let container = document.createElement("DIV")
            container.className="order"

            let button = document.createElement("BUTTON")
            button.className="edit_btn"
            button.id="edit_btn"
            button.textContent="Edit"
            button.value=ct
            button.onclick=this.editOrder
            

            let num = document.createTextNode(ct+1)
            num.className=`num_${ct}`

            let username_lb = document.createTextNode("Customer Username:")
            let username = document.createTextNode(order[1])
            username.className=`username_${ct}`

            let printmaster_lb = document.createTextNode("Print Master:")
            let printmaster = document.createTextNode(order[2])
            printmaster.className=`username_${ct}`


            let orderNum_lb = document.createTextNode("Order Number: ")
            let orderNum= document.createTextNode(order[7])
            orderNum.className=`order_num_${ct}`

            let printTime_lb = document.createTextNode("Print Time: ")
            let printTime= document.createTextNode(order[8])
            printTime.className=`print_time_num_${ct}`

            let cost_lb = document.createTextNode("Cost: ")
            let cost= document.createTextNode(order[9])
            cost.className=`cost_${ct}`

            let status_lb = document.createTextNode("Status: ")
            let status= document.createTextNode(order[10])
            status.className=`status_${ct}`

            let date_lb = document.createTextNode("Order Placed On : ")
            let date= document.createTextNode(order[11])
            date.className=`status_${ct}`

            container.appendChild(num)
            container.appendChild(username_lb)
            container.appendChild(username)
            container.appendChild(printmaster_lb)
            container.appendChild(printmaster)

            container.appendChild(orderNum_lb)
            container.appendChild(orderNum)
            container.appendChild(printTime_lb)
            container.appendChild(printTime)
            container.appendChild(cost_lb)
            container.appendChild(cost)
            container.appendChild(status_lb)
            container.appendChild(status)
            container.appendChild(date_lb)
            container.appendChild(date)
            container.appendChild(button)

        

            let parent=document.getElementById("all-orders")
            parent.append(container)

            
        }
    }

  
    

    componentDidMount(){
            fetch(`http://now.doesntexist.com:5000/get/all/orders`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json'},
        }).then(response =>{
            response.json().then((body) => {
                this.setState({
                    response:body
                })
                (body)
                this.buildOrders(body)
            })
        })
        .catch(err=>{
            (err)
        })
        if(this.state.response.length < 1){
            this.setState({
                errText:"No Pending Orders"
            })
        }
    }

    render(){
        return(
            <div className="admin-orders-container">
                <div className="all-orders-wrapper">
                    <h1>Active Orders:</h1>
                    <div id="all-orders">
                        
                    </div>
                </div>
                    
                <div id="active-order-details">

                </div>
            </div>
        )}
}