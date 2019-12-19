
import React, {Component} from "react";


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
        this.editOrder = this.editOrder.bind(this);
        this.editCost = this.editCost.bind(this);
        this.editTime= this.editTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.download_files = this.download_files.bind(this);
        this.costInput = this.costInput.bind(this);
        this.editStatus = this.editStatus.bind(this);
    }

    costInput(event){
        (event.target.value)
        (this.state)
        let old_arr = this.state.active_order
        let new_arr = []
        for(let ct=0; ct<old_arr.length; ct++){
            if(ct==8){
                new_arr.push(event.target.value)
            }
            else{
                new_arr.push(old_arr[ct])
            }
        }
        (new_arr)
        this.setState({
            active_order:new_arr
        })
    }

    editCost(event){
        
        let old_arr = this.state.active_order
        let new_arr = []
        for(let ct=0; ct<old_arr.length; ct++){
            if(ct==8){
                new_arr.push(event.target.value)
            }
            else{
                new_arr.push(old_arr[ct])
            }
        }
        this.setState({
            active_order:new_arr
        })
        (this.state)

        
    }

    editTime(event){
        let old_arr = this.state.active_order
        let new_arr = []
        for(let ct=0; ct<old_arr.length; ct++){
            if(ct==7){
                new_arr.push(event.target.value)
            }
            else{
                new_arr.push(old_arr[ct])
            }
        }
        this.setState({
            active_order:new_arr
        })
        (this.state)

    }

    editStatus(event){
        
        let old_arr = this.state.active_order
        let new_arr = []
        for(let ct=0; ct<old_arr.length; ct++){
            if(ct==9){
                new_arr.push(event.target.value)
            }
            else{
                new_arr.push(old_arr[ct])
            }
        }
        
        this.setState({
            active_order:new_arr
        })

    }



    download_files(event){
        window.open(`http://now.doesntexist.com:5000get/files/${event.target.value}`)

    }

    handleSubmit(event) {
        event.preventDefault();
    
        const data = new FormData();
        data.append('id', this.state.active_order[0]);
        data.append('print_time', this.state.active_order[7]);
        data.append('cost', this.state.active_order[8]);
        data.append('status', this.state.active_order[9]);

    
        fetch(`http://now.doesntexist.com:5000update/order/${this.state.active_order[0]}`, {
          method: 'PUT',
          body: data,
        }).then((response) => {
          (response)
          response.json().then((body) => {
            window.location.reload(false)
        })
        })
        .catch(err=>{
            (err)
        })
}

    editOrder(event){
        
        let order_details=this.state.response[event.target.value]
        
        
        this.setState({
            active_order:order_details
        })

        const orderWrapper = document.getElementById("order_details")
        
        
        if(document.getElementById("edit_order_container")!=null){
            let old =document.getElementById("edit_order_container")
            old.remove()
        }

        let title_div = document.createElement("DIV")
        title_div.appendChild(document.createTextNode(`Order: ${order_details[6]}`))
        

        let edit_order_container = document.createElement("DIV")
        edit_order_container.id="edit_order_container"
        edit_order_container.className="edit_order_container"

        let username_lb= document.createTextNode(`Customers Username: ${order_details[1]}`)
        let username_div = document.createElement("DIV")
        username_div.appendChild(username_lb)
        

        let material_lb = document.createTextNode(`Material: ${order_details[3]}`)
        let material_div = document.createElement("DIV")
        material_div.appendChild(material_lb)

        let resolution_lb = document.createTextNode(`Resolution: ${order_details[4]}`)
        let resolution_div = document.createElement("DIV")
        resolution_div.appendChild(resolution_lb)

        let color_lb = document.createTextNode(`Material: ${order_details[5]}`)
        let color_div = document.createElement("DIV")
        color_div.appendChild(color_lb)

        let print_time_lb = document.createTextNode(`Print Time Estimate: ${order_details[7]}`)
        let print_time_div = document.createElement("DIV")
        print_time_div.appendChild(print_time_lb)

        let cost_lb = document.createTextNode(`Estimate Cost: $${order_details[8]}`)
        let cost_div = document.createElement("DIV")
        cost_div.appendChild(cost_lb)
        
        let download_btn = document.createElement("BUTTON")
        download_btn.textContent=`Download Files`
        download_btn.onclick=this.download_files
        download_btn.value= order_details[6]

       

        let edit_print_time_dd= document.createElement("SELECT")
        let edit_print_time_0 = document.createElement("OPTION")
        let edit_print_time_1 = document.createElement("OPTION")
        let edit_print_time_2 = document.createElement("OPTION")
        let edit_print_time_3 = document.createElement("OPTION")
        let edit_print_time_4 = document.createElement("OPTION")

        edit_print_time_dd.onchange=this.editTime

        edit_print_time_0.value="0"
        edit_print_time_0.textContent="Less Than One Day"
        edit_print_time_1.value="1"
        edit_print_time_1.textContent="1 Day"

        edit_print_time_2.value="2"
        edit_print_time_2.textContent="2 Days"

        edit_print_time_3.value="3"
        edit_print_time_3.textContent="3 Days"

        edit_print_time_4.value="4"
        edit_print_time_4.textContent= "4 or More Days"

        edit_print_time_dd.appendChild(edit_print_time_0)
        edit_print_time_dd.appendChild(edit_print_time_1)
        edit_print_time_dd.appendChild(edit_print_time_2)
        edit_print_time_dd.appendChild(edit_print_time_3)
        edit_print_time_dd.appendChild(edit_print_time_4)

        

        let edit_cost_inpt = document.createElement("INPUT")
        edit_cost_inpt.id = "edit_cost_inpt"
        edit_cost_inpt.value =this.state.active_order[8]
        edit_cost_inpt.onchange=this.editCost


        let status_lb = document.createTextNode(`Status: ${order_details[9]}`)
        let status_div =document.createElement("DIV")
        status_div.appendChild(status_lb)

        let status_edit_dd= document.createElement("SELECT")
        let status_option_completed = document.createElement("OPTION")
        let status_option_rejected = document.createElement("OPTION")
        let status_option_pip = document.createElement("OPTION")
        let status_option_ip = document.createElement("OPTION")
        let status_option_ec = document.createElement("OPTION")

        status_option_completed.value="completed"
        status_option_completed.textContent="Complete"
        status_option_rejected.value="rejected"
        status_option_rejected.textContent="Reject"
        status_option_pip.value="print in progress"
        status_option_pip.textContent="Print In Progress"
        status_option_ip.value="in progress"
        status_option_ip.textContent="In Progress"
        status_option_ec.value="estimate complete"
        status_option_ec.textContent="Estimate Complete"



        
        
        status_edit_dd.appendChild(status_option_ip)
        status_edit_dd.appendChild(status_option_ec)
        status_edit_dd.appendChild(status_option_pip)
        status_edit_dd.appendChild(status_option_completed)

        status_edit_dd.appendChild(status_option_rejected)
        
        status_edit_dd.onchange=this.editStatus
       

        
        let edit_btn_div = document.createElement("DIV")

        let submit_btn = document.createElement("BUTTON")
        submit_btn.textContent=`Update Order`
        submit_btn.onclick=this.handleSubmit

        
        
        
        edit_btn_div.appendChild(submit_btn)
        edit_btn_div.appendChild(download_btn)
        
        edit_order_container.appendChild(title_div)
        edit_order_container.appendChild(username_div)
        edit_order_container.appendChild(material_div)
        edit_order_container.appendChild(resolution_div)
        edit_order_container.appendChild(color_div)
        edit_order_container.appendChild(print_time_div)
        edit_order_container.appendChild(edit_print_time_dd)
        edit_order_container.appendChild(cost_div)
        edit_order_container.appendChild(edit_cost_inpt)
        edit_order_container.appendChild(status_div)
        edit_order_container.appendChild(status_edit_dd)
        edit_order_container.appendChild(edit_btn_div)
        



        orderWrapper.appendChild(edit_order_container)
        
    }
    
    buildOrders(items){
        for(let ct=0; ct<items.length; ct++){
            let order= items[ct]
            

            let container = document.createElement("DIV")
            container.className="order"

            let button = document.createElement("BUTTON")
            button.className="edit_btn"
            button.id="edit_btn"
            button.textContent="Edit"
            button.value=ct
            button.onclick=this.editOrder
            
            let num_div = document.createElement("DIV")
            let num = document.createTextNode(ct+1)
            num.className=`num_${ct}`
            num_div.appendChild(num)

            let user_div = document.createElement("DIV")
            let username_lb = document.createTextNode(`Customer Username: ${order[1]}`)
            user_div.appendChild(username_lb)

            
            let material_div = document.createElement("DIV")
            let material_lb = document.createTextNode(`Material: ${order[3]}`)
            material_div.appendChild(material_lb)

            let resolution_div = document.createElement("DIV")
            let resolution_lb = document.createTextNode(`Resolution: ${order[4]}`)
            resolution_div.appendChild(resolution_lb)

            let color_div = document.createElement("DIV")
            let color_lb = document.createTextNode(`Color: ${order[5]}`)
            color_div.appendChild(color_lb)

            let status_div = document.createElement("DIV")
            let status_lb = document.createTextNode(`Status: ${order[9]}`)
            status_div.appendChild(status_lb)

            let order_date_lb = document.createTextNode("Order Placed On: ")
            let order_date = document.createTextNode(order[10])
            order_date.className=`sorder_date_${ct}`

            container.appendChild(num_div)
            
            container.appendChild(user_div)

            container.appendChild(material_div)
            container.appendChild(resolution_div)
            container.appendChild(color_div)
            container.appendChild(status_div)
            
            container.appendChild(order_date_lb)
            container.appendChild(order_date)
            container.appendChild(button)

        

            let parent=document.getElementById("orders")
            parent.append(container)

            
        }
    }

  
    

    componentDidMount(){
        fetch(`http://now.doesntexist.com:5000get/${this.state.username}/orders`, {
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
            <div className="orders-container">
                <div className="orders" id="orders">
                    
                </div>
                <div className="order_details" id="order_details">

                </div>
            </div>
        )}
}