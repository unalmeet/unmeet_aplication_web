import React from "react";
class Day extends React.Component {

  render() {
    let meetings = this.props.meetings.sort((a,b)=>Date.parse(a.date_start)-Date.parse(b.date_start));
    let countmeetings = meetings.length;
    let show = countmeetings > 3;
    let rendermeetings;
    countmeetings <= 3
      ? (rendermeetings = meetings.map((meeting) => (
          <li key={meeting.link}>{meeting.name}</li>
        )))
      : (rendermeetings = meetings
          .slice(0, 3)
          .map((meeting) => <li key={meeting.link}>{meeting.name}</li>));
    return (
      <div>
        <ul>{rendermeetings}</ul>
        {show && <div>+{countmeetings - 3}</div>}
      </div>
    );
  }
}
export default Day;
