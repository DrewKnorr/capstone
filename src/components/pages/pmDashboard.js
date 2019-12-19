import React, {Component} from "react";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export default class PMDashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            username:this.props.username,
            orders_data :""
        }
        this.buildData=this.buildData.bind(this);
    }


    buildData(orders){
        (orders)
        let estimate_in_progress =0
        let purchase_ready = 0
        let print_in_progress=0
        let ready_for_print=0
        let completed = 0

        for(let ct=0; ct< orders.length;ct++){
            let order =orders[ct]
            (order[9])
            if(order[9]=="in progress"){
                estimate_in_progress+=1;
            }
            else if(order[9]=="estimate complete"){
                purchase_ready+=1;
            }
            else if(order[9]=="ready to print"){
                ready_for_print+=1;
            }
            else if(order[9]=="print in progress"){
                print_in_progress+=1;
            }
            else if(order[9]=="completed"){
                completed+=1;
            }
        }
        this.setState({
            orders_data:[
                {
                    name: 'In Progress', Orders: estimate_in_progress
                },
                {
                    name: 'Ready For Purchase', Orders: purchase_ready
                },
                {
                    name: 'Ready To Print', Orders: ready_for_print
                },
                {
                    name: 'Print In Progress', Orders: print_in_progress
                },
                {
                    name: 'Completed', Orders: completed
                },
                  
                
              ]
        })
    }

    componentDidMount(){
        fetch(`http://now.doesntexist.com:5000get/${this.state.username}/orders`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json'},
        }).then(response =>{
            response.json().then((body) => {
                this.buildData(body)
            })
        })
        .catch(err=>{
            (err)
        })
    }
render(){
    return(
        <div className="pm-dashboard-wrapper">
            <h1>Print Master Dashboard:</h1>
            <div className="dashboard-bargraph">
            <h3>Orders Status:</h3>
            <BarChart
                width={800}
                height={300}
                data={this.state.orders_data}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
                
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Orders" fill="#038cfc" />

            </BarChart>
            </div>
            <div className="orders">
                
            </div>
        </div>
    )
}

}