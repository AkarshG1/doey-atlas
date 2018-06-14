import React,{Component} from "react";
import styled from "styled-components";
import {postData} from "./postData.js";
import {Redirect} from "react-router-dom";
import Switch from 'material-ui/Switch';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import {MenuList,MenuItem} from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
  textAlign: 'left'
};


const userData = localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):{email:'',profile:'',name:''};


const theme = ["#0ae", "0ea"];
function calendarSync(){
    postData('calendar/sync',"");
    window.location.href="http://localhost:5000/calendar/sync";
}


var ThemeClicked = true;

const Name = styled.h3`
  color: #333;
`;


function Automation(props) {
  return (
    <li>
      <Switch
      label="Automation"
      />
    </li>
  );
}

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
                <ListItemText primary="Logout" onClick={()=>(localStorage.clear('auth_token'),window.location="/")} />
              </MenuItem>

              </Paper>
        </div>
      );

}

/*                  <h3>Coming Soon:</h3>
                <li>Auto Scheduling</li>
                <li>Time use breakdown</li>
                <li>Task Collaboration</li>
                <li>Auto meetings</li>
                <Theme theme={props.theme} />
                <hr />
                <Automation state={props.automation} />*/
