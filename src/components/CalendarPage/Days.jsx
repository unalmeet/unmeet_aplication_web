import React from "react";
import {
  Card,
  CardGroup,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import Meeting from "./Meeting";
import UserContext from "../UserContext";
import Day from "./Day";

class Days extends React.Component {
  static contextType = UserContext;
  constructor(props, context) {
    super(props, context);
    this.state = {
      modal: false,
      daySelected: "",
      meetings: [],
    };

    this.toggle = this.toggle.bind(this);
  }
  arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i].link === a[j].link) a.splice(j--, 1);
      }
    }

    return a;
  }
  componentDidMount() {
    const userinfo = JSON.parse(localStorage.getItem('user_meet'))
    fetch(process.env.REACT_APP_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query:
          `query {
          listMeetingsAttendant(attendant:` +
          userinfo.id +
          `){
            link
            name
            description
            attendants
            date_start
            date_end
            host
          }
          listMeetingsHosted(host:` +
          userinfo.id +
          `){
            link
            name
            description
            attendants
            date_start
            date_end
            host
          }
        }    
      `,
      }),
    })
      .then((response) => response.json())
      .then((query) => {
        let meetings = query.data.listMeetingsAttendant.concat(
          query.data.listMeetingsHosted
        );
        var uniqueMeetings = this.arrayUnique(meetings);
        this.setState({ meetings: uniqueMeetings });
      });
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
    //this.props.meetings.map((meeting) =>(console.log(meeting)))
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
      for (let meeting in this.state.meetings) {
        const meetingtimestamp = Date.parse(
          this.state.meetings[meeting].date_start
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
          mydays[i].meetings.push(this.state.meetings[meeting]);
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
