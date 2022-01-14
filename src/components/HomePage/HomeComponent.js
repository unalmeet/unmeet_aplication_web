import React, {Component} from 'react';
import Login from '../Credentials/LoginComponent';
import Register from '../Credentials/RegisterComponent';
import {ModalBody, Button, Modal}  from 'reactstrap';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
           
        }
       
        
    }
    
    render(){
        return(
            <div className="col-12 col-md-10">
                <Login/>
                <Register/>
            </div>
        );
    }
}

export default Home;