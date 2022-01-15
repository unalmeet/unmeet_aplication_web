import React, { useEffect } from "react";
import {
  Card,
  CardGroup,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";

import Day from "./Day";

class Days extends React.Component {
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
      mydays[i] = { day: namesDays[tomorrow.getDay()], meetings:[]};
      for (let meeting in this.props.meetings) {
        const meetingtimestamp = Date.parse(this.props.meetings[meeting].date_start);
        const meetingdatetime = new Date(meetingtimestamp);
        const date = meetingdatetime.getUTCDate();
        const month = meetingdatetime.getUTCMonth();
        const year = meetingdatetime.getUTCFullYear();
        console.log(this.props.meetings[meeting])
        if (
          tomorrow.getDate() === date &&
          tomorrow.getMonth() === month &&
          tomorrow.getFullYear() === year
        ) {
          mydays[i].meetings.push(this.props.meetings[meeting]);
        }
      }
    }
    console.log(mydays);
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
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
          <CardSubtitle className="mb-2" tag="h6">
            {day.day}
          </CardSubtitle>
          <CardText tag="small">
            <Day meetings={day.meetings} />
          </CardText>
        </CardBody>
      </Card>
    ));
    return (
      <CardGroup
        style={{
          backgroundColor: "#144B7D",
          margin: "1rem",
          borderRadius: "1rem",
        }}
      >
        {daystorender}
      </CardGroup>
    );
  }
}

export default Days;
