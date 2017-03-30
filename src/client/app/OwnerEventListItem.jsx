import React from 'react';
import OwnerDetailedView from './OwnerDetailedView.jsx';
import moment from 'moment';

class OwnerEventListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    this.handleClickListItem = this.handleClickListItem.bind(this);
  }

  handleClickListItem() {
    this.setState({clicked: !this.state.clicked});
    if (this.state.clicked) {
      this.props.getEvents(this.props.history, function(result) {
        this.setState({
          ownerEvents: result.ownerEvents,
          friendEvents: result.friendEvents
        });
      });
    }
  }

  render() {
    let date = moment(this.props.event.date);
    console.log(this.props.event);
    return (
      <div>
      <div className="panel list-item row" onClick={this.handleClickListItem}>  
        <div className="glyphicon glyphicon-globe col-sm-1"></div>
        <div className="col-sm-4">{this.props.event.title}</div>
        <div className="col-sm-4">{date.format('dddd D') + 'th'} at {this.props.event.time}</div>
        <div className="col-sm-3"><span>Number of attendees: {this.props.event.attendees.length}</span></div>
        <br/>
      </div>
        {this.state.clicked ? <OwnerDetailedView eventId = {this.props.event.event_id} accessToken={this.props.accessToken} event={this.props.event}/> : '' }
      </div>
    );
  }
}

export default OwnerEventListItem;


