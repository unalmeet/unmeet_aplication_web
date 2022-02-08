import React, {useEffect,Component} from 'react';
import {Button, Form,FormGroup,Label, Input, Col, CardHeader } from 'reactstrap';
import {Card, CardBody}  from 'reactstrap';


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            user:'',
            password:'',
            token:''
        }
       
        this.handleInputChange=this.handleInputChange.bind(this);
        this.sendForm=this.sendForm.bind(this);
    }
    handleInputChange(event){
        const target =event.target;
        const value = target.type === 'checkbox' ? target.checked: target.value;
        const name =target.name;
        this.setState({
            [name]:value
        }) 
    }
    sendForm(event){
        const FILMS_QUERY=`mutation
        {
            login(loginUser:{
                email:"${this.state.email}",
                password:"${this.state.password}"
            })
            {id,email,name,token}
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
            this.answerForm(data.data)
        });

        event.preventDefault();
        
    }
    answerForm(data){
        data=data.login;
        this.setState({id:data.id,email:data.email, user:data.name, token:data.token})
        return this.props.answer(this.state.id,this.state.user,this.state.email,this.state.token);
    } 
    

    render(){
        return(
            <div className="text-center"> 
            
                <CardHeader className="bg-primary">
                    <h4 className="text-title text-white">Login</h4>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={(event)=>{this.sendForm(event)}} >
                        <FormGroup row>
                            <Label htmlFor="email" md={12}>Email:</Label>
                            <Col md={12}>
                            <Input type="email" id="email" name="email" placeholder="Email" value={this.state.email}
                            onChange={this.handleInputChange}/> 
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="password" md={12}>Password:</Label>
                            <Col md={12}>
                            <Input type="password" id="password" name="password" placeholder="Password" value={this.state.password}
                            onChange={this.handleInputChange}/> 
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md={{size:12}}>
                                <Button type="submit" color="primary">Login</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
            
            </div>
        );
    }
}

export default Login;