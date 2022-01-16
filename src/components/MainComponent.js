import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Calendar from './CalendarPage/CalendarComponent';
import Home from './HomePage/HomeComponent';
import InMeeting from './InMeetingPage/InMeetingComponent';
import {AuthProvider} from "./core";


class Main extends Component {
    constructor(props){
        super(props);
        this.state={
          user:'',
          email:'',
          token:''
        };
    }
    componentDidMount() {
      const user_meet = window.localStorage.getItem('user_meet');
      const user = JSON.parse(user_meet);
      if(user!=null){
        this.setState({user:user.user, email:user.email, token:user.token})
      }
      console.log(user);
    }
    credentialLogin(user, email, token){
      let user_meet={
        user:user,
        email:email,
        token:token
      }
      window.localStorage.setItem('user_meet',JSON.stringify(user_meet));
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