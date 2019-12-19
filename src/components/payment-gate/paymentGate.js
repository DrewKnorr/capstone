import React, {Component} from "react";



export default class PaymentGate extends Component {
    constructor(props){
        super(props);
        this.state={
            id : this.props.order,
            f_name: this.props.fname,
            l_name:this.props.lname,
            username: "",
            print_master: "",
            material:"",
            resolution:"",
            color:"",
            order_num:"",
            print_time:"",
            cost:0,
            street_addr:"",
            state:"",
            zip_code:"",
            country:"",
            cc:0,
            experation_date:"",
            cvv:0

        }
        this.buildOrder = this.buildOrder.bind(this)
        this.postPayment = this.postPayment.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
          errorText: ""
        });
        (this.state)
    }

    buildOrder(order){
        (order)
        this.setState({
            username:order[1],
            print_master:order[2],
            material:order[3],
            resolution:order[4],
            color:order[5],
            order_num:order[6],
            print_time:order[7],
            cost:order[8]
        })
    }

    postPayment(){
        
        const data = new FormData();
        data.append('f_name', this.state.f_name)
        data.append('l_name', this.state.l_name)
        data.append('street_addr', this.state.street_addr)
        data.append('state', this.state.state)
        data.append('zip_code', parseInt(this.state.zip_code,10))
        data.append('country', this.state.country)
        data.append('cc', parseInt(this.state.cc, 10))
        data.append('experation', this.state.experation_date)
        data.append('cvv', parseInt(this.state.cvv ,10))
        data.append('cost', parseFloat(this.state.cost, 10))
        data.append('print_master', this.state.print_master)
        data.append('order_num',this.state.order_num)
        

        fetch(`http://now.doesntexist.com:5000post/payment`, {
            method: 'POST',
            body: data,
        }).then(response =>{
            response.json().then((body) => {
                window.location.reload(false)
            })
        })
        .catch(err=>{
            (err)
        })
    }

    componentDidMount(){
        
        fetch(`http://now.doesntexist.com:5000get/order/${this.state.id}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json'},
        }).then(response =>{
            response.json().then((body) => {
                this.buildOrder(body)
            })
        })
        .catch(err=>{
            (err)
        })
    }

    render(){
        return(
            <div className="payment-gate">
                <div className="button-wrapper">
                    <button onClick={this.postPayment}>Pay</button>
                </div>
                <div className="billing-wrapper">
                    <h2>Shipping Information</h2>
                    <div className="shipping-info">
                        <div className="shipping-item">
                            <input id="addr" name="street_addr" value={this.state.street_addr} onChange={this.handleChange} type="text" />
                            <label type="text" htmlFor="addr">Street Address</label>
                        </div>
                        <div className="shipping-item">
                            
                            <input id="state" name="state" value={this.state.state} onChange={this.handleChange} type="text"/>
                            <label htmlFor="state">State</label>
                        </div>
                        <div className="shipping-item">
                            <input id="zip_code" name="zip_code" value={this.state.zip_code} onChange={this.handleChange} type="text"/>
                            <label type="text" htmlFor="zip_code">Zip Code</label>
                        </div>
                        <div className="shipping-item">
                            <input id="country" name="country" value={this.state.country} onChange={this.handleChange} type="text"/>
                            <label htmlFor="country">Country</label>
                        </div>
                    </div>
                    <h2>Payment Information</h2>
                    <h4>{`First Name: ${this.state.f_name} Last Name: ${this.state.l_name}`}</h4>
                    <div className="payment-info">
                        <div className="payment-item">
                            <input type="text" name="cc" value={this.state.cc} onChange={this.handleChange} id="cc"/>
                            <label htmlFor="cc">Credit Card Number</label>
                        </div>

                        <div className="payment-item">
                            <input type="text" value={this.state.experation_date} onChange={this.handleChange} name="experation_date" id="experation_date"/>
                            <label type="text" htmlFor="experation">Experation Date</label>
                        </div>

                        <div className="payment-item">
                            <input type="text" name="cvv" value={this.state.cvv}  onChange={this.handleChange} id="cvv"/>
                            <label htmlFor="cvv">CVV</label>
                        </div>


                    </div>

                </div>
            

                <div className="details">
                    <h4>{`Order Id: ${this.state.id}`}</h4>
                    <h4>{`Username: ${this.state.username}`}</h4>
                    <h4>{`Print Master: ${this.state.print_master}`}</h4>
                    <h4>{`Material: ${this.state.material}`}</h4>
                    <h4>{`Color: ${this.state.color}`}</h4>
                    <h4>{`Order Number: ${this.state.order_num}`}</h4>
                    <h4>{`Cost: $${this.state.cost}`}</h4>
                    <h4>{`Print Time: ${this.state.print_time} Day('s)`}</h4>
                </div>
                <h2>Order Details</h2>
            </div>
                
        )
    }
}