import React from 'react';
import {render} from 'react-dom';
import InvitedFriendsEntry from './InvitedFriendsEntry.jsx'
import Modal from 'boron/DropModal';
import $ from 'jquery';

const InvitedFriends = (props) => (
  <div>
    {props.data.map((entry, i) => <InvitedFriendsEntry key={i} entry={entry}/>)} 
  </div>
)

export default InvitedFriends;
