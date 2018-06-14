import React, { Component } from "react";
import styled from "styled-components";
import {Button} from "./Buttons.js";
import {NavLink} from "react-router-dom";
import ProfileDrawer from "./sideBar.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const baseURL = "http://localhost:3000/";
const tabs  = {
    Doey : baseURL + "doey",
    Plan : baseURL + "plan",
    Review : baseURL + "review"
}

var userAvatar = localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')).provider_pic:'';

const Header = styled.nav`
  background-color: #333;
  overflow: hidden;
  width: 100%;
  display: grid;
  color: #eee;
  text-align: center;
  box-shadow: 0px 5px 15px #666;
`;

const Tabs = styled.div`
    grid-row:1;
    grid-column: 7;
    max-height: 100%;
`;

const navlinks = styled.div`
  display:inline;
  align-self: center;
  &>a{

      justify-self: center;
     padding: 15px;
     padding-top: 20px;
     color: #fff;
     text-decoration: none;
     &:hover {
       background-color: #444;
       transition: 0.05s;
       cursor: pointer;
     }
     &:active{
       background-color: #888;
     }
  }
`;

const Doey = navlinks.extend`
    grid-row:1;
  font-size: 24px;
  justify-self:center;
`;

const Plan = navlinks.extend`
  padding-top: 10px;
`;

const Review = navlinks.extend`
  padding-top: 10px;

`;

const Profile = styled.div`
  grid-row:1;
  grid-column: 12;
  padding: 5px;
  padding-right: 10px
`;

function Navbar(props) {
  return (
    <Header>
    <Tabs>

    <Plan>
      <NavLink
        to="/plan"
        activeStyle={{
            fontWeight: 'bold',
            color: '#0ae',
            borderBottom:"solid 5px  #0ae"
        }}
        id = 'Plan'
        >
            Plan
        </NavLink>
    </Plan>

    <Doey>
      <NavLink
        to="/doey"
        activeStyle={{
            fontWeight: 'bold',
            color: '#0ae',
            borderBottom:"solid 5px #0ae"
        }}
        id = 'Doey'
        >
            Doey
        </NavLink>
    </Doey>

    <Review>
      <NavLink to="/review" activeStyle={{
        fontWeight: 'bold',
        color: '#0ae',
        borderBottom:"solid 5px #0ae"
        }}>
            Review
        </NavLink>
    </Review>
    </Tabs>
      <Profile >
        <ProfileDrawer avatar={JSON.parse(localStorage.getItem('userData')).provider_pic}/>
       </Profile>
    </Header>
  );
}

export default Navbar;
