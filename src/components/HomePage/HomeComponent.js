import React, {Component} from 'react';
import Login from '../Credentials/LoginComponent';
import Register from '../Credentials/RegisterComponent';
import {ModalBody, Button, Modal}  from 'reactstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


class Home extends Component {
    constructor(props){
        super(props);
        this.state={
           
        }
       
        
    }
    
    render(){
        return(
            <div className="col-12 col-md-10">
                
                <Popup trigger={<button> Login</button>} position="right center">
                    <Login/>
                </Popup>
                <Popup trigger={<button> Register</button>} position="right center">
                    <Register/>
                </Popup>
                 

            </div>
        );
    }
}

export default Home;