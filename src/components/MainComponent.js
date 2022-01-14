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
    render(){
        return (
            <div className="App">
              <Switch>
                  <Route path="/home" component={Home} />
                  <Route exact path="/calendar" component={Calendar} />
                  <Route exact path ="/inmeeting" component={InMeeting}/>
                  <Redirect to="/home"/>
              </Switch>
            </div>
          );
        }
}

export default Main;