import React, {Component} from 'react';
import {Button, Form,FormGroup,Label, Input, Col, CardHeader } from 'reactstrap';
import {Card, CardBody}  from 'reactstrap';



class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
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
                    <h4 className="text-title text-white">Login</h4>
                </CardHeader>
                <CardBody>
                    <Form>
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