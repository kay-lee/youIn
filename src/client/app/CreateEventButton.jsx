import React from 'react';
import {render} from 'react-dom';
import FriendsListItem from './FriendsListItem.jsx';
import Modal from 'boron/DropModal';
import $ from 'jquery';

class CreateEventButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: {},
      friends:[],
      title: '',
      what: 'food-drinks',
      where: '',
      date: '',
      time: '',
      min: '',
      invitees: {},
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inviteFriend = this.inviteFriend.bind(this);
    this.addToUsers_Events = this.addToUsers_Events.bind(this);
  }

  componentDidMount() {
    this.setState({friends: this.props.friends})
  }

  showModal () {
    this.refs.modal.show();
  }

  hideModal () {
    this.refs.modal.hide();
  }

  callback (event) {
    console.log(event);
  }

  handleChange (name, event) {
    let newState = {};
    newState[name] = event.target.value;
    this.setState(newState);
  }

  inviteFriend(friend) {
    let it = friend.user_id;
    if (this.state.clicked[it]) {
      return () => {

       this.setState((prevState, props) => {
         let clicked = prevState.clicked;
         let invitees = prevState.invitees;
         let id = friend.user_id;
         clicked[id] = false;
         delete invitees[id];
         return {invitees: invitees, clicked: clicked};
       });
      }
    } else {
      return () => {
        this.setState((prevState, props) => {
          let clicked = prevState.clicked;
          let invitees = prevState.invitees;
          let id = friend.user_id;
          invitees[id] = friend;
          clicked[id] = true;
          return {invitees: invitees, clicked: clicked};
        });
      }
    }
  }

  addToUsers_Events(eventId) {
    let users = this.state.invitees;
    let userIds = [];
    for(let i in users) {
      userIds.push(users[i].user_id)
    }
    let users_eventsData = {
      userIds: userIds,
      eventId: eventId,
    }
    $.ajax({
      url: '/events/users',
      method: 'POST',
      data: JSON.stringify(users_eventsData),
      contentType: 'application/json',
      success: function(data) {
        console.log('success from addToUsers_Events in CreateEventButton :', data);
        this.hideModal();
        this.props.getEvents(this.props.history, function(result) {
          this.setState({
            ownerEvents: result.ownerEvents,
            friendEvents: result.friendEvents
          });
        });
      }.bind(this),
      error: function(err) {
        console.log('error from addToUsers_Events  in CreateEventButton', err);
        this.props.history.push('/');
      }.bind(this)
    });
  }

  handleSubmit (event) {
    let context = this;
    event.preventDefault();
    let eventData = {
      owner: '1',//this is hardcoded - we need to have the owner come from who is logged in.
      title: this.state.title,
      short_desc: this.state.what,
      description: this.state.description,
      location: this.state.where,
      date: this.state.date,
      time: this.state.time,
      min: this.state.min
    }
  $.ajax({
    url: '/events/create',
    method: 'POST',
    data: JSON.stringify(eventData),
    contentType: 'application/json',
    success: function(data) {
      console.log('data from ajax in CreateEventButton', data.event_id);
      context.addToUsers_Events(data.event_id);
    },
    error: function(err) {
      console.log('error in ajax request in CreateEventButton', err);
      this.props.history.push('/');
    }
    });
  }

  render () {
    return (
      <div>
        <div><button onClick={this.showModal.bind(this)} id="create_event" className="col-md-4 col-md-offset-4">Create Event</button></div>
        <Modal ref="modal">
          <div className="container-fluid">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="row">
                <div className="col-md-8">
                  <h4 className='create'>Give your event a name</h4>
                  <input 
                    value={this.state.title} 
                    type="text"
                    onChange={this.handleChange.bind(this, 'title')} required
                    />
                  <h4 className='create'>Pick an event category</h4>
                  <select value={this.state.what} onChange={this.handleChange.bind(this, 'what')} required>
                    <option value="food-drinks" >Food/Drinks</option>
                    <option value="indoor-activity">Indoor Activity</option>
                    <option value="outdoor-activity">Outdoor Activity</option>
                    <option value="hangout">Hangout</option>
                    <option value="other">Other</option>
                  </select>
                  <h4 className='create'>Where?</h4>
                  <input 
                    value={this.state.where}
                    onChange={this.handleChange.bind(this, 'where')}
                    type="text" required
                    />
                  <h4 className='create'>When?</h4>
                  <input 
                    value={this.state.date}
                    onChange={this.handleChange.bind(this, 'date')}
                    type="date" required
                    />
                  <input
                    value={this.state.time}
                    onChange={this.handleChange.bind(this, 'time')}
                    type="time" required
                    /> 
                  <h4 className='create'>Minimum friends for this event?</h4>
                  <input 
                    value={this.state.min}
                    onChange={this.handleChange.bind(this, 'min')}
                    type="number" required
                    />
                </div>
                <div className="col-md-4">
                  <h4 className='create'>Invite Friends</h4>
                  {
                    this.props.friends.map( (friend, i) => (
                      <FriendsListItem
                        key={i}
                        friend={friend}
                        inviteFriend={this.inviteFriend(friend)}
                        />
                      )
                    )
                  }
                </div>
              </div>
              <div className="col-md-12">
                <h4 className='create'>Description: </h4>
              </div>
              <div className="col-md-12">
                <input
                value={this.state.description}
                onChange={this.handleChange.bind(this, 'description')}
                type="text" required/>
              </div>
              <div className="col-md-12">
                <button type="submit">See Who's In!</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

export default CreateEventButton;
