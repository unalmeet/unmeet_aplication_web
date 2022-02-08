import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  CardBody,
  CardHeader,
} from "reactstrap";
import UserContext from "../UserContext";

class NewMeeting extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      date_start: "",
      date_end: "",
      host: "",
      attendants: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ host: this.context });
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    name === "attendants"
      ? this.setState({ attendants: value.split(",") })
      : this.setState({
          [name]: value,
        });
  }
  handleSubmit(event) {
    console.log(this.state)
    fetch(process.env.REACT_APP_API, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true },
      body: JSON.stringify({
        query:
          `mutation {
          addMeeting(
            addMeeting: {
              name: ` +
          JSON.stringify(this.state.name) +
          `
              description: ` +
          JSON.stringify(this.state.description) +
          `
              date_start: ` +
          JSON.stringify(this.state.date_start) +
          `
              date_end: ` +
          JSON.stringify(this.state.date_end) +
          `
              host: ` +
          this.state.host +
          `
              attendants: [` +
          this.state.attendants +
          `]
            }
          ){
            link
          }
        }`,
      }),
    })
      .then((response) => response.json())
      .then((query) => {
        console.log(query.data);
      });
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
              <Label htmlFor="name" md={12}>
                Subject:
              </Label>
              <Col md={12}>
                <Input
                  type="subject"
                  id="name"
                  name="name"
                  placeholder="Subject"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
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
                  required
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
                  required
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
                  required
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
                  placeholder="Emails separated by comas"
                  value={this.state.attendants}
                  onChange={this.handleInputChange}
                  required
                  multiple
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 12 }}>
                <Button
                  type="submit"
                  color="primary"
                  onClick={this.handleSubmit}
                >
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
