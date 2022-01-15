import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";

class NewMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      descripcion: "",
      date_start: "",
      date_end: "",
      host: "",
      attendants: ""
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
          <h4 className="text-title text-white">New Meeting</h4>
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup row>
              <Label htmlFor="subject" md={12}>
                Subject:
              </Label>
              <Col md={12}>
                <Input
                  type="subject"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  value={this.state.subject}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="description" md={12}>
                Description:
              </Label>
              <Col md={12}>
                <Input
                  type="description"
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="date_start" md={12}>
                Date Start:
              </Label>
              <Col md={12}>
                <Input
                  type="datetime-local"
                  id="date_start"
                  name="date_start"
                  value={this.state.date_start}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="date_end" md={12}>
                Date End:
              </Label>
              <Col md={12}>
                <Input
                  type="datetime-local"
                  id="date_end"
                  name="date_end"
                  value={this.state.date_end}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="attendants" md={12}>
              Attendants:
              </Label>
              <Col md={12}>
                <Input
                  type="email"
                  id="attendants"
                  name="attendants"
                  placeholder = "Emails separated by comas"
                  value={this.state.attendants}
                  onChange={this.handleInputChange}
                  multiple
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 12 }}>
                <Button type="submit" color="primary">
                  Create Meeting
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
