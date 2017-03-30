import React from 'react';
import $ from 'jquery';
import ChatRoom from './ChatRoom.jsx'

class OwnerDetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false
    }
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEventStatus = this.updateEventStatus.bind(this);
  }


  updateEventStatus(url) {
    $.ajax({
      url: url,
      method: 'POST',
      'Content-type': 'application/json',
      beforeSend: (xhr) => {
        xhr.setRequestHeader ('Authorization', 'Bearer ' + this.props.accessToken);
      },
      data: {
        eventId: JSON.stringify(this.props.event.event_id)
      },
      success: function() {
        console.log('Success');
      },
      error: function(err) {
        console.log('Error in updateEventStatus in OwnerDetailedView.jsx', err);
      }
    });
  }



  deleteEvent () {
    console.log('event DELETED!');
    this.updateEventStatus('/delete/owner');

  }

  render() {
    const attendees = this.props.event.attendees;

    return (
      <div id="event-details" className="event-details row list-item">
        <div className="col-md-8 col-md-offset-1">
          <p>{this.props.event.description}</p>
          <p>{this.props.event.location}</p>
          <div className="attendees">
            <h4> Attendees: </h4>
            <ul>
              {attendees.map((attendee, i) => <li key={i}>{attendee.firstname}</li>)}
            </ul>
          </div>        
        </div>
        <div className="col-md-12 ">
          <ChatRoom eventId = {this.props.eventId} />
        </div>
        <button onClick={this.deleteEvent} id="owner-delete-button" className="col-md-offset-1">Delete this Event</button>
      </div>
    );
  }
}

export default OwnerDetailedView;


// {this.state.confirm === false ? "Delete this Event" : "Are you sure?"}
