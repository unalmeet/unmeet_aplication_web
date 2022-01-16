import React from "react";
import {
  CardGroup,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardFooter,
} from "reactstrap";
class Meeting extends React.Component {
  joinMeeting(link) {
    console.log(link);
  }
  render() {
    let meetings = this.props.meetings.sort(
      (a, b) => Date.parse(a.date_start) - Date.parse(b.date_start)
    );
    let mymeetings = [];
    for (let i in meetings) {
      let x = {
        link: "",
        name: "",
        description: "",
        date_start: "",
        date_end: "",
        host: "",
        attendants: "",
      };
      let start = new Date(Date.parse(meetings[i].date_start));
      let end = new Date(Date.parse(meetings[i].date_end));
      x.link = meetings[i].link;
      x.name = meetings[i].name;
      x.description = meetings[i].description;
      x.date_start = start.toLocaleTimeString("en-US", { timeZone: "UTC" });
      x.date_end = end.toLocaleTimeString("en-US", { timeZone: "UTC" });
      x.host = meetings[i].host;
      x.attendants = meetings[i].attendants.toString();
      mymeetings.push(x);
    }

    let rendermeetings = mymeetings.map((meeting) => (
      <Card
        key={meeting.link}
        inverse
        style={{
          backgroundColor: "#029ACA",
          margin: "1rem",
          borderRadius: "1rem",
        }}
      >
        <CardBody onClick={() => this.joinMeeting(meeting)}>
          <CardTitle tag="h5">{meeting.name}</CardTitle>
          <CardSubtitle className="mb-2" tag="h6">
            {meeting.date_start} - {meeting.date_end}
          </CardSubtitle>
          <CardText>
            <div>Description: {meeting.description}</div>
            <div>Attendants: {meeting.attendants}</div>
          </CardText>
          <div>
            <CardFooter>Hosted by: {meeting.host}</CardFooter>
          </div>
        </CardBody>
      </Card>
    ));
    return <div>{rendermeetings}</div>;
  }
}
export default Meeting;
