import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Calendar from './CalendarPage/CalendarComponent';
import Home from './HomePage/HomeComponent';
import InMeeting from './InMeetingPage/InMeetingComponent';


class Main extends Component {
    constructor(props){
        super(props);
        this.state={
          user:'',
          email:'',
          token:''
        };
    }
    credentialLogin(email){
      console.log(email);
      console.log("email");
      this.setState({email:"email"});
    }
    
    render(){
        return (
            <div className="App row text-center">
              <Switch>
                  <Route path="/home" component={()=><Home credentials={(email)=>this.credentialLogin(email)}/>} />
                  
                  <Route exact path="/calendar" component={Calendar} />
                  <Route exact path ="/inmeeting" component={InMeeting}/>
                  <Redirect to="/home"/>
              </Switch>
            </div>
          );
        }
}

export default Main;