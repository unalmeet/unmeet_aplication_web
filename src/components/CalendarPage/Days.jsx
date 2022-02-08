import React, { useState, useEffect } from "react";
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
import Day from "./Day";

export default function Days() {
  const [modal, setModal] = useState(false);
  const [daySelected, setDay] = useState("");
  const [meetings, setMeetings] = useState([]);

  let arrayUnique = (array) => {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i].link === a[j].link) a.splice(j--, 1);
      }
    }
    return a;
  };

  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem("user_meet"));
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
        var uniqueMeetings = arrayUnique(meetings);
        setMeetings(uniqueMeetings);
      });
      console.log(meetings)
  }, [JSON.stringify(meetings), modal]);

  let toggle = () => {
    setModal(!modal);
  };

  let dayClicked = (day) => {
    setDay(day);
    setModal(!modal);
  };
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
    for (let meeting in meetings) {
      const meetingtimestamp = Date.parse(
        meetings[meeting].date_start
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
        mydays[i].meetings.push(meetings[meeting]);
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
      <CardBody onClick={() => dayClicked(day)}>
        <CardTitle tag="h5">{day.day}</CardTitle>
        <CardSubtitle className="mb-2" tag="h6">
          {day.date}
        </CardSubtitle>
        <CardText tag="small">
          <Day meetings={day.meetings} />
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
        <Modal toggle={toggle} isOpen={modal}>
          <ModalHeader toggle={toggle}>
            {daySelected.day} {daySelected.date}
          </ModalHeader>
          <ModalBody>
            <Meeting meetings={daySelected.meetings} />
          </ModalBody>
        </Modal>
      </CardGroup>
    </div>
  );
}
