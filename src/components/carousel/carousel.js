import React, {Component} from "react";
import ImageOne from "../../../static/assets/images/carousel/ImgOne.gif";
import ImageTwo from "../../../static/assets/images/carousel/ImgTwo.gif";
import ImageThree from "../../../static/assets/images/carousel/ImgThree.gif";
import ImageFour from "../../../static/assets/images/carousel/ImgFour.gif";
import ImageFive from "../../../static/assets/images/carousel/ImgFive.jpg";

export default class Carousel extends Component {
    constructor(){
        super();
        this.state ={
            images:[ImageOne, ImageTwo, ImageThree, ImageFour, ImageFive],
            text:[
                "Welcome To We 3D!",
                "Sign Up And Get Your Order Started Today",
                "Visit Our Print Masters Page And Register As  A Print Master Today",
                "Bring Your Idea To Life With 3D Printers",
                "Simply Upload Your Files And Get Started"
            ],
            img_ct : 0,
            active_img:ImageOne,
            active_text:"Welcome To We 3D!",
            next:Number(1),
            previous:Number(-1),
            interval:""
        }
        this.cycleImg= this.cycleImg.bind(this);
        this.manualCycleImg=this.manualCycleImg.bind(this);
    }

    componentDidMount(){
        let interval = setInterval(() => this.cycleImg(), 5000)
        this.setState({
            interval:interval
        })
    }

    cycleImg(){
        let temp_val = this.state.img_ct
        if(temp_val>=this.state.images.length-1){
            temp_val = 0;
        }
        else if (temp_val<0){
            tmep_val = this.state.images.length-1
        }
        else{
            temp_val +=1;
        }
    
        this.setState({
            img_ct:temp_val,
            active_img:this.state.images[this.state.img_ct],
            active_text:this.state.text[temp_val]

        })
    }

    manualCycleImg(event){
        (this.state.interval)
        let temp_val = this.state.img_ct
        temp_val += Number(event.target.value);

        if(temp_val>this.state.images.length-1){
            temp_val = 0;
        }
        else if(temp_val <0 ){
            temp_val =this.state.images.length-1;
        }
        (temp_val)
        this.setState({
            img_ct:temp_val,
            active_img:this.state.images[this.state.img_ct],
            active_text:this.state.text[temp_val]
        })

        
        clearInterval(this.state.interval);
        (this.state.interval)

        let interval = setInterval(() => this.cycleImg(), 10000)
        this.setState({
            interval:interval
        })
        (this.state.interval)
    }
    
    render () {
      return (
        <div className="carousel" >
            <div className="image" style={{backgroundImage:this.state.active_img}}>
                <button className="previous" type="button" value={this.state.previous} onClick={this.manualCycleImg}>{`<`}</button>
                <img src={this.state.active_img}/>
                <h5>{this.state.active_text}</h5>
                <button className="next" type="button" value={this.state.next} onClick={this.manualCycleImg}>{`>`}</button>
            </div>
        </div>
      );
    }
  }
  