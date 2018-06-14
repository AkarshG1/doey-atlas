import React from 'react';
import Drawer from 'material-ui/Drawer';
import {MenuItem} from 'material-ui/Menu';
import styled from "styled-components";
import {Button} from "./Buttons.js";
import Profile from "./profile.js";

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
export default class ProfileDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <ProfileButton avatar={this.props.avatar} logout={this.props.logout} onClick={this.handleToggle}/>
        <Drawer
          anchor="right"
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
        >
          <Profile/>
          </Drawer>
      </div>
    );
  }
}
