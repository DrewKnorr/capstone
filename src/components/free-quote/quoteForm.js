import React, {Component} from "react";
import { Redirect } from 'react-router-dom'

import LoadingImg from "../../../static/assets/images/loading/key.gif";



export default class Quote extends Component {
    constructor(props){
        super(props)
        this.state={
            username:this.props.username,
            material:"",
            resolution:"",
            color:"",
            errorText:"",
            order_num:"",
            loading_visability:"hidden",
            form_visability:"visible",
            uploading:false,
            selected_files:[],
            redirect:""
            
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addMoreFiles = this.addMoreFiles.bind(this)
        this.updateLoading = this.updateLoading.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.handleRedirect = this.handleRedirect.bind(this)
        
    }

    handleRedirect(){

      alert(`Your Order Has Been Placed\n Order Number: ${this.state.order_num}`)
      this.setState({
        redirect:<Redirect to='/userProfile' />
      })
    }
   
    handleFileChange = (event) =>{
      
      this.setState({
        selected_files:this.state.selected_files.concat(event.target.files[0])
      })
      
    }


    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
          errorText: ""
        });
      
    }


    addMoreFiles(event){
      let div = document.getElementById("file_upload_container")

      let new_file = document.createElement("INPUT")
      new_file.type="file"
      new_file.onchange=this.handleFileChange
      new_file.id="file_upload_btn"

      return div.appendChild(new_file)
    }

    updateLoading(){
      
      ("VISIBILITY: ",this.state.loading_visability)
      if (this.state.uploading == true){
        this.setState({
          loading_visability:"visible",
          form_visability:"hidden"
        })
      }
      else{
        this.setState({
          loading_visability:"hidden",
          form_visability:"visible"
        })
        this.handleRedirect()
      }
    }

    handleFileUpload(order_num){
      this.updateLoading()
      let files = this.state.selected_files
      for(let ct=0; ct<files.length;ct++){
        const data = new FormData();
        data.append('file', files[ct])
        fetch(`http://now.doesntexist.com:5000/upload/files/${order_num}`, {
          method: 'PUT',
          body: data,
        }).then((response) => {
          response.json().then((body) => {
              this.updateLoading()
          });
        });
      }
      this.setState({
        uploading:false
        
      })
      
    }

  

    handleSubmit(event) {
        event.preventDefault();
    
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('material', this.state.material);
        data.append('resolution',this.state.resolution);
        data.append('color',this.state.color)
    
        fetch('http://now.doesntexist.com:5000/post/order', {
          method: 'POST',
          body: data,
        }).then((response) => {
          response.json().then((body) => {
              let text = Object.values(body)[0]
              let order = Object.values(body)[1]
              this.setState({
                username:this.props.username,
                material:"",
                resolution:"",
                color:"",
                errorText:text,
                order_num: order,
                uploading:true
              })
              
              this.handleFileUpload(order)
              
          });
        });

        return 
      }
    
render(){
    return(
        <div className="quote-container">
            {this.state.redirect}
            <div className="loading-wrapper" style={{visibility:this.state.loading_visability}}>
              <h4>Your Files Are Uploading Now</h4>
              <img src={LoadingImg} />
            </div>
            
            <form style={{visibility:this.state.form_visability}}className="quote-form" id="quote-form">

                <h2>{this.state.errorText}</h2>
                <div className="file_upload_container" id="file_upload_container">
                  <h2>Upload Files To Print:</h2>
                  <input className="file_upload_btn" id="file_upload_btn"  onChange={this.handleFileChange} type="file" />
                </div>

                <button className="add_more_files" onClick={this.addMoreFiles}>+</button>
                <label htmlFor="material" >Material:</label>
                <select name="material" className="material" onChange={this.handleChange} required={true}>
                    <option name="material" vlaue=""></option>
                    <option name="material" value="pla">PLA</option>
                    <option name="material" value="abs">ABS</option>
                    <option name="material"value="petg">PETG</option>
                    <option name="material" value="wood">WOOD</option>
                </select>
                <label htmlFor="resolution" >Resolution:</label>
                <select name="resolution" className="resolution" onChange={this.handleChange} required={true}>
                    <option name="resolution" vlaue=""></option>
                    <option name="resolution" value="0.05">0.05 mm </option>
                    <option name="resolution" value="0.07">0.07 mm</option>
                    <option name="resolution" value="0.10">0.10 mm</option>
                    <option name="resolution" value="0.15">0.15 mm</option>
                    <option name="resolution" value="0.20">0.20 mm</option>
                    <option name="resolution" value="0.30">0.30 mm</option>
                </select>
                <label htmlFor="color" >Color:</label>
                <select name="color" className="color" onChange={this.handleChange} required={true}>
                    <option name="color" vlaue=""></option>
                    <option name="color" vlaue="black">Black</option>
                    <option name="color" vlaue="red">Red</option>
                    <option name="color" vlaue="yellow">Yellow</option>
                    <option name="color" vlaue="green">Green</option>
                </select>
                
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </form>
        </div>
    )}
}