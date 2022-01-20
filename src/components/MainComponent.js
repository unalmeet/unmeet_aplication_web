import react, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Calendar from './CalendarPage/CalendarComponent';
import Home from './HomePage/HomeComponent';
import InMeeting from './InMeetingPage/InMeetingComponent';



class Main extends Component {
    constructor(props){
        super(props);
        this.state={
          id:'',
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
      
    }
    credentialLogin(id, user, email, token){
      let user_meet={
        id:id,
        user:user,
        email:email,
        token:token
      }
      window.localStorage.setItem('user_meet',JSON.stringify(user_meet));
      return this.setState({id:id,user:user,email:email, token:token});
    }
    

    
    render(){

      const isLogin = this.state.token!="" ? true:false;
      const home =(
        <Switch>
          <Route path="/home" component={()=><Home credentials={(id, user, email, token)=>this.credentialLogin(id, user, email, token)}/>} />
          <Redirect to="/home"/>
        </Switch>);
      const protectedComponent =(
        <Switch>
          <Route  path={"/calendar/"+this.state.user} component={()=><Calendar user={this.state}/>}/>
          <Route  path={"/inmeeting/"+this.state.user} component={()=><InMeeting user={this.state}/>}/>
          <Redirect to={"/calendar/"+this.state.user}/>
        </Switch> );
      
      const ProtectedRoute= isLogin==true ? home:protectedComponent;
        
        

        
      console.log(ProtectedRoute)
      return (
        <div className="App row text-center">
          <Switch>
            {ProtectedRoute}
          </Switch>
        </div>
      );
    }
}

export default Main;