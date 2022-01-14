import React, {Component} from 'react';
import {Button, Form,FormGroup,Label, Input, Col } from 'reactstrap';
import {Card, CardBody, CardFooter}  from 'reactstrap';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
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

    render(){
        const FormLogin = ()=>{
            return(
                <Form>
                     <FormGroup row>
                        <Label htmlFor="user">User Name:</Label>
                        <Col md={10}>
                        <Input type="name" id="user" name="user" placeholder="User Name" value={this.state.user}
                        onChange={this.handleInputChange}/> 
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="email">Email:</Label>
                        <Col md={10}>
                        <Input type="email" id="email" name="email" placeholder="Email" value={this.state.email}
                        onChange={this.handleInputChange}/> 
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="password">Password:</Label>
                        <Col md={10}>
                        <Input type="password" id="password" name="password" placeholder="Password" value={this.state.password}
                        onChange={this.handleInputChange}/> 
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="password_confirmation">Password Confirmation:</Label>
                        <Col md={10}>
                        <Input type="password" id="password_confirmation" name="password_confirmation" placeholder="Password" value={this.state.password_confirmation}
                        onChange={this.handleInputChange}/> 
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md={{size:10, offset:2}}>
                            <Button type="submit" color="primary">Register</Button>
                        </Col>
                    </FormGroup>
                </Form>
            );
        }

        return(
            <Card>
                <CardBody>
                    {FormLogin}
                </CardBody>
                <CardFooter>
                    <Button type="submit" color="danger">Cerra</Button>
                </CardFooter>
            </Card>
           
        );
    }
}

export default Register;