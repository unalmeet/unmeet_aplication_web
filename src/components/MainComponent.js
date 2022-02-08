import { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Calendar from "./CalendarPage/CalendarComponent";
import Home from "./HomePage/HomeComponent";
import InMeeting from "./InMeetingPage/InMeetingComponent";
import UserContext from "./UserContext";
import Header from './Header/HeaderComponent';



class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      user: "",
      email: "",
      token: "",
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
    credentialLogout(message){
      console.log(message.logout.message)
      if(message.logout.message=="Logout seccessfull"){
        console.log("if")
        window.localStorage.removeItem('user_meet');
        this.setState({
          id:'',
          user:'',
          email:'',
          token:''
        })

      }
    }
  
    render(){
      const Meet= ({match})=><InMeeting url={match.params.url}/>
      //const isLogin = this.state.token!="" ? true:false;
      const isLogin = true;
      const home =(
        <Switch>
          <Route path="/home" component={()=><Home credentials={(id, user, email, token)=>this.credentialLogin(id, user, email, token)}/>} />
          <Redirect to="/home"/>
        </Switch>);
      const protectedComponent =(
        <UserContext.Provider value={this.state.id}>
          <Switch>
            <Route  path={"/calendar/"+this.state.user} component={()=><Calendar user={this.state}/>}/>
            <Route  path="/inmeeting/:url" component={Meet}/>
            <Redirect to={"/calendar/"+this.state.user}/>
          </Switch>
          </UserContext.Provider>
         );
      
      const ProtectedRoute= isLogin== false ? home:protectedComponent;
        
      return (
        <div className="App row text-center">
          <div className="col-12 col-md-12">
            <Header token={this.state.token} answer={(message)=>this.credentialLogout(message)}/>
            {ProtectedRoute}
          </div>
        </div>
      );
    }
}

export default Main;
