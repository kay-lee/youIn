import React from 'react';
import {render} from 'react-dom';
import Modal from 'boron/DropModal';
import $ from 'jquery';


class InviteeListEntry extends React.Component {
	constructor(props) {
		super(props);
		this.getInviteeList = this.getInviteeList.bind(this);
	}

	componentDidMount () {
		this.getInviteeList();
	}

	getInviteeList () {
		$.ajax({
			url: '/invites',
			method: 'GET',
			contentType: 'application/json',
			success: function(data) {
				console.log(data);
			},
			error: function(err) {
				console.log('error occured in getInviteeList', err);
			}
		})
	}

	render () {
		return (
			<ul>
				<li>Name: {props.entry.name} | Email: {props.entry.email}</li>
			</ul>
		)
	}
}

export default InviteeListEntry;