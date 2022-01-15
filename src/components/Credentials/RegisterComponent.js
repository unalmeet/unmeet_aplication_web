import React, {Component} from 'react';
import {Button, Form,FormGroup,Label, Input, Col } from 'reactstrap';
import {Card, CardBody, CardFooter, CardHeader}  from 'reactstrap';

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
        return(
            <div className="text-center"> 
                
                <CardHeader className="bg-primary">
                    <h4 className="text-title text-white">Register</h4>
                </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label htmlFor="user" md={12}>User Name:</Label>
                            <Col md={12}>
                            <Input type="name" id="user" name="user" placeholder="User Name" value={this.state.user}
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