import React from 'react';
import {render} from 'react-dom';
import InviteeList from './InviteeList.jsx';
import Modal from 'boron/DropModal';
import $ from 'jquery';

class Invite extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			invitees: []
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.exitInvite = this.exitInvite.bind(this);
		this.getInvitees = this.getInvitees.bind(this);
	}

	showModal () {
		this.refs.modal.show();
		this.getInvitees();
	}	

	hideModal () {
		this.refs.modal.hide();
	}

	handleChange (input, event) {
		var newEntry = {};
		newEntry[input] = event.target.value;
		this.setState(newEntry);
	}

	getInvitees () {
		$.ajax({
			url: '/invites',
			method: 'GET',
			success: function(data) {
				this.setState({
					invitees: data
				})
			}.bind(this),
			error: function(err) {
				console.log(err);
			}
		})
	}

	handleSubmit (event) {
		event.preventDefault();
		var invitee = {
			name: this.state.name,
			email: this.state.email
		}
		$.ajax({
			url: '/invites',
			method: 'POST',
			data: JSON.stringify(invitee),
			contentType: 'application/json',
			success: function(data) {
				this.getInvitees();
				$('#nameInput, #emailInput').val('');
			}.bind(this),
			error: function(err) {
				console.log('error');
			}
		})
	} 

	exitInvite (event) {
		event.preventDefault();
		this.hideModal();
	}

	render() {
		return (
			<div>
				<button onClick={this.showModal.bind(this)} className="invite_friends">Invite Friends</button>
				<Modal ref="modal">
					<div className="inviteFriendsContainer">
						<form>
							<h3 className="inviteFriendsMessage">Invite Your Friends</h3>
							<br></br>
							<InviteeList invitees={this.state.invitees} />
							<br></br>
							<br></br>
							<h5>Want to invite others?</h5>
							<br></br>
							Name:
							<input id="nameInput" onChange={this.handleChange.bind(this, 'name')} type="text" />
							<span></span>
							Email Address:
							<input id="emailInput" onChange={this.handleChange.bind(this, 'email')} type="email" />
							<br></br>
							<br></br>
							<br></br>
							<button onClick={this.handleSubmit} type="submit">Send Invites</button>
							<button onClick={this.exitInvite}>Done</button>
						</form>
					</div>
				</Modal>
			</div>
		)
	}	

}

export default Invite;