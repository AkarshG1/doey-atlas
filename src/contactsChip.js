import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

const styles = {
  chip: {
    margin: 4,
    gridRow: 1,
    justifySelf: 'right',
    padding: 0
  },

};

const avatarStyles = {
    height: 30,
    width: 30
}

function getContacts(contacts) {
  var i;
  var contactlist = [];
  if(contacts){
      for (i = 0; i < contacts.length; i++) {
        contactlist[i+1] = <Avatar src={contacts[i]} style={avatarStyles}/>;
      }
    }
  return contactlist;
}

export default function contactsChip(props){
    return (
            <Chip
              onClick={props.handleClick}
              style={styles.chip}
              avatar={<Avatar src={JSON.parse(localStorage.getItem('userData')).provider_pic}/>}
              label={getContacts(props.contacts)}
            />

    );
}
