import React, {useEffect,Component} from 'react';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = { 

        }
    }
    answer(data){
        console.log(data.data.logout);

    }
    logout(event){
        console.log(this.props.answer)
            const FILMS_QUERY=`mutation
            {
                logout(logoutUser:{
                    token:"${this.props.token}"
                })
                {message}
            }`
    
            fetch(process.env.REACT_APP_API,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({query:FILMS_QUERY})  
            })
            .then((response) => {
                if (response.status >= 400) {
                    console.log(response);
                  throw new Error("Error fetching data");
                } else {
                  return response.json();
                }
              })
            .then((data) =>{
                console.log(data)
               return this.props.answer(data.data)
            });
    
            event.preventDefault();
           
    }
    render(){
        const contentHeaderUser=(
            <div className="row d-flex justify-content-between">
                <div className="col-5 col-md-2"><h3>UNMEET</h3></div>
                <a className="col-5 col-md-2 btn" onClick={(event)=>this.logout(event)}>
                    <div href="#" className=" text-white" >
                        Logout <i className=" text-white fa fa-user" ></i>
                    </div>
                </a>
            </div>
        );
        const contentHeaderLog=(
            <div className="row d-flex justify-content-between">
                <div className="col-5 col-md-2"><h3>UNMEET</h3></div>
               
            </div>
        );
        const contentHeader= this.props.token!="" ? contentHeaderUser:contentHeaderLog;

        return(
            <div className="jumbotron2">
                <div className="row text-white">
                    <div className="col-12 col-md-12  ">
                        {contentHeader}
                    </div>
                </div>
            </div>  
        );
    }
}