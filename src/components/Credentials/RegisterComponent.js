import React, {Component} from 'react';
import {Button, Form,FormGroup,Label, Input, Col } from 'reactstrap';
import {Card, CardBody, CardFooter, CardHeader}  from 'reactstrap';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'',
            user:'',
            email:'',
            password:'',
            password_confirmation:'',
            token:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        const target =event.target;
        const value = target.type === 'checkbox' ? target.checked: target.value;
        const name =target.name;
        this.setState({
            [name]:value
        }) 
    }
    handleSubmit(event){
        console.log(this.state);
        event.preventDefault();
    }

    sendForm(event){
        console.log(this.state);
        const FILMS_QUERY=`mutation
        {
            register(registerUser:{
                name:"${this.state.user}",
                email:"${this.state.email}",
                password:"${this.state.password}",
                password_confirmation:"${this.state.password_confirmation}"
            })
            {id,email,name,token}
        }`
        

        fetch('http://34.122.205.216:8080/graphql',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({query:FILMS_QUERY})  
        })
        .then((response) => {
            if (response.status >= 400) {
              throw new Error("Error fetching data");
            } else {
              return response.json();
            }
          })
          .then((data) =>this.answerForm(data.data));
    
        event.preventDefault();
    }
    answerForm(data){
        console.log(data);
        data=data.register;
        this.setState({id:data.id,email:data.email, user:data.name, token:data.token})
        const adminmeetinguser=`mutation
        {
            addUser(addUser:{
                id:${data.id},
            })
            {id}
        }`
        

        fetch('http://34.122.205.216:8080/graphql',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({query:adminmeetinguser})  
        })
        .then((response) => {
            if (response.status >= 400) {
              throw new Error("Error fetching data");
            } else {
              return response.json();
            }
          })
        return this.props.answer(this.state.id,this.state.user,this.state.email,this.state.token);
    } 
    t

    render(){
        return(
            <div className="text-center"> 
                
                <CardHeader className="bg-primary">
                    <h4 className="text-title text-white">Register</h4>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={(event)=>{this.sendForm(event)}}>
                        <FormGroup row>
                            <Label htmlFor="user" md={12}>User Name:</Label>
                            <Col md={12}>
                            <Input type="text" id="user" name="user" placeholder="User Name" value={this.state.user}
                            onChange={this.handleInputChange}/> 
                            </Col>
                        </FormGroup>
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
                            <Label htmlFor="password_confirmation" md={12}> Password Confirmation:</Label>
                            <Col md={12}>
                            <Input type="password" id="password_confirmation" name="password_confirmation" placeholder="Password" value={this.state.password_confirmation}
                            onChange={this.handleInputChange}/> 
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md={{size:12}}>
                                <Button type="submit" color="primary">Register</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
            </div>
           
        );
    }
}

export default Register;