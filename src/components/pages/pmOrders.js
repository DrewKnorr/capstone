import React, {Component} from "react";
import Orders from "../pm-orders/orders"

export default class PMOrders extends Component {
    constructor(props){
        super(props);
        this.state={

            username:this.props.username
        }
    }
render(){
    return(
        <div className="orders-wrapper">
            <div className="title-wrapper">
                <h1>{`Orders For ${this.state.username}`}</h1>
            </div>
            <div className="about-us-content">
                <Orders
                    username={this.state.username}
                />
            </div>
        </div>
    )
}

}