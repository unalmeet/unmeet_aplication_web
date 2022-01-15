import React from "react";
import {
  Card,
  CardGroup,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";

class Days extends React.Component {
  render() {
    const today = new Date();

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let mydays = [];
    for (let i = 0; i < 5; i++) {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + i);
      mydays.push(days[tomorrow.getDay()]);
    }

    const daystorender = mydays.map((day, index, date) => (
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
          <CardTitle tag="h5">{day}</CardTitle>
          <CardSubtitle className="mb-2" tag="h6">
            FECHA
          </CardSubtitle>
          <CardText tag="small">
            <ul>
              <li>Evento 1</li>
              <li>Evento 2</li>
              <li>Evento 3</li>
              <li>Evento 4</li>
            </ul>
          </CardText>
        </CardBody>
      </Card>
    ));
    return (
      <CardGroup style={{ backgroundColor: "#144B7D", margin: "1rem", borderRadius:"1rem" }}>
        {daystorender}
      </CardGroup>
    );
  }
}

export default Days;
