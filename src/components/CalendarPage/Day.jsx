import React from "react";
class Day extends React.Component {

  render() {
    let meetings = this.props.meetings.sort((a,b)=>Date.parse(a.date_start)-Date.parse(b.date_start));
    let countmeetings = this.props.countmeetings;
    let show = countmeetings > 4;
    let rendermeetings;
    countmeetings <= 4
      ? (rendermeetings = meetings.map((meeting) => (
          <li key={meeting.link}>{meeting.name}</li>
        )))
      : (rendermeetings = meetings
          .slice(0, 4)
          .map((meeting) => <li key={meeting.link}>{meeting.name}</li>));
    return (
      <div>
        <ul>{rendermeetings}</ul>
        {show && <div>+{countmeetings - 4}</div>}
      </div>
    );
  }
}
export default Day;
