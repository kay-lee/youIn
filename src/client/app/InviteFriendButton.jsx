import React from 'react';
import {render} from 'react-dom';
import InvitedFriends from './InvitedFriends.jsx';
import InvitedFriendsEntry from './InvitedFriendsEntry.jsx'
import Modal from 'boron/DropModal';
import $ from 'jquery';

class InviteFriendButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      name: '',
      email: ''
      // input: []
    }
    this.inviteUsers = this.inviteUsers.bind(this);
    this.getInvitees = this.getInvitees.bind(this);
    // this.addInput = this.addInput.bind(this);
  }

  componentDidMount() {
    this.getInvitees();
  }

  showModal () {
    this.refs.modal.show();
    this.getInvitees();
  }

  hideModal () {
    this.refs.modal.hide();
  }

  handleChange(input, event) {
    var newUser = {};
    newUser[input] = event.target.value,
    this.setState(newUser)
  }

  inviteUsers(event) {
    let context = this;
    var newUser = {
      name: this.state.name,
      email: this.state.email
    }
    console.log('New User', newUser)
    $.ajax({
      url: '/inviteUsers',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newUser),
      success: function(data) {
        console.log('Invite success', data)
        context.getInvitees();
      },
      error: function(error) {
        console.error('Error', error)
      }
    })
  }

  getInvitees(event) {
    let context = this;
    $.ajax({
      url: '/invitees',
      method: 'GET',
      success: function(data) {
        console.log('Successful invitee retrieval', data)
          this.setState({
            invites: data
          })
      }.bind(this),
      error: function(error) {
        console.error('Error', error)
      }
    })
  }

  // Testing out ability to add extra friend and name input fields
  // addInput(event) {
  //   const input = this.refs.input
  //   const addInput = this.state.input
  //   addInput.push(input)
  //   console.log(addInput)
  //   this.setState({
  //     input: addInput
  //   })
  // }

  render() {
    return(
      <div>
      <div><button onClick={this.showModal.bind(this)} id="create_event" className="col-md-4 col-md-offset-4">Invite Friends</button></div>
        <Modal ref="modal">
          <div className="container-fluid">
          <h2>Be awesome - invite your friends</h2>
            <div className="row">
              <div className="col-md-8">
                <h4 className='create'>Friends who will love you:</h4>
                <InvitedFriends data={this.state.invites}/>
                <br />
              </div>
            </div>


            <div className="row">
              <div className="col-md-8">
                <h4 className='create'>You know you want to:</h4>
                <div ref="input">
                  Name: <input placeholder="Name" onChange={this.handleChange.bind(this, 'name')}/><br />
                  Email: <input placeholder="Email" onChange={this.handleChange.bind(this, 'email')}/><br />
                  <br />
                </div>
              </div>
              <div className="col-md-12">
                <button type="submit" onClick={this.addInput}>+</button>
              </div>
              <div className="col-md-12">
                <button type="submit" onClick={this.inviteUsers}>Invite!</button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default InviteFriendButton;
