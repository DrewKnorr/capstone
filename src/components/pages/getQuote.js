import React, {Component} from "react";

import QuoteForm from "../free-quote/quoteForm"


export default class GetQuote extends Component {
    constructor(props){
        super(props)
        this.state ={
            username: this.props.username
        }

    }



    
render(){
    
    return(
        <div className="quote-wrapper">
            <div className="quote-content">
            <h1>Welcome: {this.props.username}</h1>
            <p>Here is where you can you can upload you files and fill out the details of your order</p>
                <QuoteForm
                    username = {this.state.username}
                />
            </div>
        </div>
        )
    }

}