import React from "react";
import styled from "styled-components";
import {postData} from "./postData.js";
import Switch from 'material-ui/Switch';
import Paper from 'material-ui/Paper';
import {MenuItem} from 'material-ui/Menu';
import {ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
  textAlign: 'left'
};

function calendarSync(){
    postData('calendar/sync',"");
    window.location.href="https://doey-atlas-back-end.herokuapp.com/calendar/sync";
}

const Name = styled.h3`
  color: #333;
`;

export default function Profile (props){

      return (
         <div>
              <Name></Name>
              <br/>

              <Paper style={style}>
              <MenuItem>
                <Tooltip enterDelay={300} leaveDelay={300} placement="left" title={JSON.parse(localStorage.getItem('userData')).email} >
                    <Chip
                    avatar={<Avatar src={JSON.parse(localStorage.getItem('userData')).provider_pic} />}
                    label={JSON.parse(localStorage.getItem('userData')).name}
                    />
                </Tooltip>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemText primary="Sync Google Calendar" onClick={()=>calendarSync()}/>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemText primary="Logout" onClick={()=>(localStorage.clear('auth_token') , window.location="/")} />
              </MenuItem>

              </Paper>
        </div>
      );

}
