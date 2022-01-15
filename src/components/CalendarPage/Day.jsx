import React from "react";
class Day extends React.Component {
  render() {
    const rendermeetings = this.props.meetings.map((meeting) => <li key={meeting.link}>{meeting.name}</li>);
    return <ul>{rendermeetings}</ul>;
  }
}
export default Day;
