import React, { useEffect } from "react";
import {
  Card,
  CardGroup,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import Meeting from "./Meeting";

import Day from "./Day";

class Days extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      daySelected: "",
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  dayClicked(day) {
    this.setState({
      modal: !this.state.modal,
      daySelected: day,
    });
  }
  render() {
    //this.props.meetings.map((meeting) =>(console.log(meeting))
    var mydays = new Array(5);
    const today = new Date();
    const namesDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (var i = 0; i < mydays.length; i++) {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + i);
      mydays[i] = {
        date: tomorrow.toLocaleDateString(),
        day: namesDays[tomorrow.getDay()],
        meetings: [],
      };
      for (let meeting in this.props.meetings) {
        const meetingtimestamp = Date.parse(
          this.props.meetings[meeting].date_start
        );
        const meetingdatetime = new Date(meetingtimestamp);
        const date = meetingdatetime.getUTCDate();
        const month = meetingdatetime.getUTCMonth();
        const year = meetingdatetime.getUTCFullYear();
        if (
          tomorrow.getDate() === date &&
          tomorrow.getMonth() === month &&
          tomorrow.getFullYear() === year
        ) {
          mydays[i].meetings.push(this.props.meetings[meeting]);
        }
      }
    }
    const daystorender = mydays.map((day, index) => (
      <Card
        key={index}
        inverse
        style={{
          backgroundColor: "#029ACA",
          margin: "1rem",
          borderRadius: "1rem",
        }}
      >
        <CardBody onClick={() => this.dayClicked(day)}>
          <CardTitle tag="h5">{day.day}</CardTitle>
          <CardSubtitle className="mb-2" tag="h6">
            {day.date}
          </CardSubtitle>
          <CardText tag="small">
            <Day meetings={day.meetings} countmeetings={day.meetings.length} />
          </CardText>
        </CardBody>
      </Card>
    ));
    return (
      <div>
        <CardGroup
          style={{
            backgroundColor: "#144B7D",
            margin: "1rem",
            borderRadius: "1rem",
          }}
        >
          {daystorender}
          <Modal toggle={this.toggle} isOpen={this.state.modal}>
            <ModalHeader toggle={this.toggle}>
              {this.state.daySelected.day} {this.state.daySelected.date}
            </ModalHeader>
            <ModalBody>
              <Meeting meetings={this.state.daySelected.meetings} />
            </ModalBody>
          </Modal>
        </CardGroup>
      </div>
    );
  }
}

export default Days;
