import React, {Component} from 'react';
import Login from '../Credentials/LoginComponent';
import Register from '../Credentials/RegisterComponent';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
           
        }
        
    }
    render(){
        const Login =()=>{
            return(
                <Login/>
            );
        }


        return(
            <div className="container">
                {<Login/>}
            </div>
        );
    }
}

export default Home;