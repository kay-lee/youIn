import React from 'react';
import {render} from 'react-dom';
import Modal from 'boron/DropModal';
import $ from 'jquery';

const InvitedFriends = (props) => (
  <div>
    <span>Name: {props.entry.name} | Email: {props.entry.email}</span>
  </div>
)

export default InvitedFriends;