import React, {Component} from "react";



export default class AboutUs extends Component {
render(){
    return(
        <div className="about-us-wrapper">

            <div className="about-us-content">
                <div id="first" className="about-content-wrapper">
                    <h1>Our Mission</h1>
                    <p>We here at We 3D want to connect users with great ideas to hobbiest who have the skill and desire to bring those ideas to life</p>
                   
                </div>
                <div id="second" className="about-content-wrapper">
                    <h1>How It Works</h1>
                    <p>
                        We provide a platform for hobbiests to expand on there craft and assist others in brining items to life.
                        Anyone of our users can register to become part of the We 3D family. After registering to become a print master
                        our staff reviews your application and decide on approving your application. 
                        We work closely with our print masters to provide a easy and quality product so that you can receive the best product
                    </p>
                </div>
                
            </div>
        </div>
    )
}

}