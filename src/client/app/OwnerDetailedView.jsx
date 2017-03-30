import React from 'react';
import $ from 'jquery';

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
      <div className="row list-item">
        <div className="col-md-8 col-md-offset-1">
          <p className="event_details">{this.props.event.description}</p>
          <p className="event_details">We are meeting at: {this.props.event.location}</p>
        </div>
        <div className="col-md-3">
          <ul className="event_details">
            {attendees.map((attendee, i) => <li key={i}>{attendee.firstname}</li>)}
          </ul>
        </div>
        <button onClick={this.deleteEvent} id="owner-delete-button" className="col-md-offset-1">Delete this Event</button>
      </div>
    );
  }
}

export default OwnerDetailedView;


// {this.state.confirm === false ? "Delete this Event" : "Are you sure?"}