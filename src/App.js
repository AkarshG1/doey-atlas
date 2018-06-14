import React from "react";
import { Component } from "react";
import styled from "styled-components";
import Navbar from "./Navbar.js";
import Profile from "./profile.js";
import DoeyTab from "./DoeyTab.js";
import PlanTab from "./PlanTab.js";
import ReviewTab from "./ReviewTab.js";
import { Button } from "./Buttons.js";
import {BrowserRouter,Route,Switch,Router,Redirect} from 'react-router-dom';
import {GetData} from "./getData.js";
import axios from 'axios';
import Tabs1 from './tabs.js';
import AddTaskModal from "./addtaskModal.js";
import Snackbar from 'material-ui/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';

const AddButton = Button.extend`
  position: fixed;
  bottom: 20px;
  right: 20px;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  font-size: 50px;
  text-align: center;
  box-shadow: 2px 5px 12px 2px grey;
  &:hover {
    box-shadow: 5px 5px 12px 5px grey;
  }
  &:active {
    box-shadow: none;
  }
`;

const userAvatar = localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')).provider_pic:'';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "Doey",
      profileView: false,
      addTaskOpen: false,
      snackbarOpen: false
    };

    this.profileViewToggle = this.profileViewToggle.bind(this);
    this.tabClicked = this.tabClicked.bind(this);
    this.addClose = this.addClose.bind(this);
    this.openSnackBar = this.openSnackBar.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentDidMount(){
      return <Redirect to={'/doey'}/>
  }

  tabClicked(tab) {
    this.setState({ activeTab: tab });
  }

  handleRequestClose(){
      this.setState({
          snackbarOpen:false
      });
  }
  profileViewToggle() {
    if (!this.state.profileView) {
      this.setState({ profileView: true });
    } else {
      this.setState({
        profileView: false
      });
    }
  }

  addClose(){
    this.setState({addTaskOpen: false});
  }

  openSnackBar(){
      this.setState({snackbarOpen: true});
  }

  render() {
    return (
      <div>
        <Tooltip enterDelay={300} leaveDelay={300} placement="left" title="Add Task">
            <AddButton
                id="add"
                onClick={() => {
                  this.setState({addTaskOpen:true})
                }}
            >

                +
            </AddButton>
        </Tooltip>

        <AddTaskModal open={this.state.addTaskOpen} close={this.addClose} success={this.openSnackBar}/>
          <Snackbar
              open={this.state.snackbarOpen}
              message="Task added to your schedule"
              autoHideDuration={2000}
              onClose={this.handleRequestClose}
              onRequestClose={this.handleRequestClose}
            />

        <Navbar
          activeTab={this.state.activeTab}
          tabClicked={this.tabClicked}
          avatar = {userAvatar}
          profileView={this.profileView}
          profileViewToggle={this.profileViewToggle}
        />

        <Route
            path="/doey"
            render={()=><DoeyTab />
            }
        />
        <Route
            path="/plan"
            render={()=><PlanTab/>
            }
        />

        <Route
            path="/review"
            render={()=><ReviewTab/>
            }
        />


      </div>
    );
  }
}
