import React, {Component} from "react";

import Arrow from "../../../static/assets/images/home/arrow.png"
//Carousel
import Carousel from"../carousel/carousel";

export default class Home extends Component {
    
render(){
    return(
        <div className="home-wrapper">
            <div className="picture-carousel">
                <Carousel/>
            </div>
            <div className="road-map">
                <div className="column">
                    <h3>Step One </h3>
                    <p>Sign up for an account to get started on your 3D printing journey</p>
                </div>
                <img className="arrow" src={Arrow}/>
                <div className="column">
                    <h3>Step Two</h3>
                    <p>Once you've got your account head over to the Get Quote tab to upload your files to get your free estimate</p>
                </div>
                <img className="arrow" src={Arrow}/>
                <div className="column">
                    <h3>Step Three</h3>
                    <p>Confirm your order and work with your Print Master to create your item and bring your idea to life</p>
                </div>
            </div>
        </div>
    )
}
}