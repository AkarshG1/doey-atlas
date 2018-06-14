import React, { Component } from "react";
import styled from "styled-components";
import {Button} from "./Buttons.js";
import {NavLink,Link} from "react-router-dom";
import ProfileDrawer from "./sideBar.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Tabs, Tab} from 'material-ui/Tabs';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const baseURL = "'https://doey-atlas.herokuapp.com/'";
const tabs  = {
    Doey : baseURL + "doey",
    Plan : baseURL + "plan",
    Review : baseURL + "review"
}
const ProfileButton = Button.extend`
  background-image : url(${props=>props.avatar});
  background-size: cover;
  border-style:solid;
  border-width:1px;
  border-color:#0ae;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

//import {Header},{navlinks},{Doey},{Plan},
const Header = styled.nav`
  background-color: #333;
  overflow: hidden;
  width: 100%;
  display: grid;
  color: #eee;
  text-align: center;
  box-shadow: 0px 5px 15px #666;
  &>a{
      text-decoration:none;
      color:#ccc;
  }
  &>a:hover{
      background-color: #666;
  }
`;

const navlinks = styled.a`
  text-decoration: none;
  padding: 5px;
  align-self: center;
  justify-self:
  &:hover {
    background-color: #444;
    transition: 0.05s;
    cursor: pointer;
  }
  &:active{
    background-color: #888;
  }
`;

const Profile = navlinks.extend`
  grid-row:1;
  grid-column: 13;
  padding-top: 5px;
`;

export default function Tabs1(props) {
  return (
     <div>
     <Header>
     <MuiThemeProvider>
      <Tabs style={styles}>
           <Tab label="Plan" component={Link} to="/plan" value="/plan"/>
           <Tab label="Doey" component={Link} to="/doey" value="/doey" />
           <Tab label="Review"  component={Link} to="/review" value="/review"/>
      </Tabs>
      <Profile >
        <ProfileDrawer avatar={props.avatar}/>
       </Profile>
     </MuiThemeProvider>
     </Header>
    </div>
  );
}
