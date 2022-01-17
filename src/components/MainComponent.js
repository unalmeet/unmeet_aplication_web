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
    credentialLogin(user, email, token){
      console.log("listo")
      return this.setState({user:user,email:email, token:token});
    }
    
    render(){
        return (
            <div className="App row text-center">
              <Switch>
                  <Route path="/home" component={()=><Home credentials={(user, email, token)=>this.credentialLogin(user, email, token)}/>} />
                  
                  <Route exact path="/calendar" component={Calendar} />
                  <Route exact path ="/inmeeting" component={InMeeting}/>
                  <Redirect to="/home"/>
              </Switch>
            </div>
          );
        }
}

export default Main;