import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import Link from "react-router-dom/Link";

class NewMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div className="text-center">
        <CardHeader className="bg-primary">
          <h4 className="text-title text-white">Join Meeting</h4>
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup row>
              <Label htmlFor="link" md={12}>
                UNMEET-Link:
              </Label>
              <Col md={12}>
                <Input
                  type="text"
                  id="link"
                  name="link"
                  placeholder="UNMEETXXXXXXX"
                  value={this.state.link}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 12 }}>
                <Button type="submit" color="primary">
                    <Link to={`/inmeeting/${this.state.link}`} style={{ color: 'white' }}>Join Meeting</Link>
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </div>
    );
  }
}

export default NewMeeting;
