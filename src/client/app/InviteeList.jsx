import React from 'react';
import {render} from 'react-dom';
import InviteeListEntry from './InviteeListEntry.jsx';

const InviteeList = (props) => (
	<ul>
		{props.invitees.map((invitee) => (
			<li key={invitee.id}>Name: {invitee.name} | Email: {invitee.email} </li>
		))}
	</ul>
)
export default InviteeList;