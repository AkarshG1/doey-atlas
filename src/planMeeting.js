import React, {Component} from "react";
import styled from "styled-components";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {GetData} from "./getData.js";
import {postData} from "./postData.js";
import DatePicker2 from "./datePicker.js";
import TimePicker2 from "./timePicker.js";
import DateTimePicker2 from "./dateTimePicker.js";
import TextField from '@material-ui/core/TextField';
import {Redirect} from 'react-router-dom';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import {getDate, getTime } from './dateTimeHelpers.js';
import InputLabel from '@material-ui/core/InputLabel';

const SubTaskcard = styled.div`
  max-height: 150px;
  overflow-y:scroll;
  margin: 5px;
  background-color: #fff;
  border-style: solid;
  border-width: 0.5px;
  border-color: #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #ccc;
  & > h2 {
    text-align: center;
    margin: 20px;
    color: #0ae;
  }
`;

export default class PlanMeeting extends Component{
    constructor(props) {
    super(props);
    this.state = {
        currentCollab:null,
        collaborators:[],
        taskName : "",
        location:'',
        deadline:null,
        start:null,
        end:null,
        duration:60,
        startSearch:null,
        endSearch:null,
        collaboratorsData:[],
        slots : [],
        selectedSlot : null
    }
    this.onCollabInputChange = this.onCollabInputChange.bind(this);
    this.scheduleMeeting = this.scheduleMeeting.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onDurationInputChange = this.onDurationInputChange.bind(this);
    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
    this.onStartSearchChange = this.onStartSearchChange.bind(this);
    this.onEndSearchChange = this.onEndSearchChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.getCollaborators = this.getCollaborators.bind(this);
    this.getCollaboratorChips = this.getCollaboratorChips.bind(this);
    this.handleCollabDelete = this.handleCollabDelete.bind(this);
    this.addCollab = this.addCollab.bind(this);
    this.findSlots = this.findSlots.bind(this);
    this.selectSlot = this.selectSlot.bind(this);
    this.showScheduleButton = this.showScheduleButton.bind(this);
    }

    onCollabInputChange(e){
        this.setState({ currentCollab: e.target.value })
    }

    addCollab(){
        var collab = this.state.currentCollab;
        var collablist = this.state.collaborators;
        if(collab){
            collablist.push(collab);
            this.setState({
                currentCollab:"",
                collaborators:collablist
            })
            this.getCollaborators();
        }
        else{
            return null;
        }
    }

    scheduleMeeting(){
        if(this.state.taskName){
        var task = {
            snackbarOpen:false,
            task_id:Date.now(),                       //Possible bug
            taskname:this.state.taskName,
            collaborators:this.getCollaborators(this.state.collaborators),  //avatars
            deadline:this.state.deadline?this.state.deadline:null,
            start:this.state.start?this.state.start:null,
            end:(this.state.start&&this.state.duration)?this.state.start+this.state.duration:null,
            subtasks:"",
            location:this.state.location?this.state.location:null,
            status:'',
            selectedSlot:[]
        }
        postData('add',task);

        this.setState({
            snackbarOpen:true,
            currentCollab:null,
            collaborators:[],
            taskName : "",
            location:'',
            deadline:null,
            start:null,
            end:null,
            duration:60,
            startSearch:null,
            endSearch:null,
            collaboratorsData:[],
            slots : [],
            selectedSlot : null
        });
    }else{
        alert('Please Enter Meeting Title!')
    }
    }

    onLocationChange(e) {
      this.setState({location: e.target.value });
    }

    onInputChange(e) {
      this.setState({taskName: e.target.value });
    }

    onDurationInputChange(e){
        this.setState({
          duration: e.target.value,
        });
    }

    onStartChange(time){
        this.setState({
            start:Date.parse(time),
        });
    }
    onEndChange(time){
        this.setState({
            end:Date.parse(time),
        });
    }

    onStartSearchChange(time){
        this.setState({
            startSearch:Date.parse(time),
        });
    }
    onEndSearchChange(time){
        this.setState({
            endSearch:Date.parse(time),
        });
    }

    getCollaborators(){
        var collaborators = {emails:this.state.collaborators};
        var collaboratorsData = this.state.collaboratorsData;
        postData('getCollabs',collaborators,
            (response)=>{
                (response.data[response.data.length-1])?collaboratorsData.push(response.data[response.data.length-1]):null
            },
            (error)=>{collaborators.emails.pop()}
            );
        this.setState({
            collaborators:collaborators.emails,
            collaboratorsData:collaboratorsData});
    }

    handleCollabDelete(i) {
        let collablist = this.state.collaborators;
        collablist.splice(i, 1);
        this.setState({ collaborators: collablist });
    }

    getCollaboratorChips(){
        var collaborators = this.state.collaboratorsData;
        var returntags=[];
        console.log(collaborators)
        if(this.state.collaboratorsData){
            for(var i=0; i<collaborators.length; i++){
                if(collaborators[i][0]){
                    returntags[i] = (
                        <Chip
                        avatar={<Avatar src={collaborators[i][0].avatar} />}
                        label={collaborators[i][0].name}
                        />
                    );
                }
            }
        }
        return returntags
    }

    findSlots(){
        const meetingData = {
            startSearch : this.state.startSearch,
            endSearch : this.state.endSearch,
            duration : this.state.duration?this.state.duration*60000:3600000,
            emails : this.state.collaborators,
        };
        postData('slots',meetingData,
            (response)=>this.setState({
                slots : response.data
            }),
            ()=>alert('Please Enter Data First')
            );
        console.log(this.state.slots);
    }

    selectSlot(e){
        var slot = e.target.value.split(',');
        slot[0] = parseInt(slot[0]);
        slot[1] = parseInt(slot[1]);
        console.log(slot);
        this.setState({
            selectedSlot:slot,
            start:slot[0],
            end:slot[1]
        });
    }

    slotsList(){
        const slotlist = this.state.slots;
        var returntags=[];
        if(!slotlist ){
            return null;
        }
        for(var i=0; i<slotlist.length; i++){
            var date = getDate(slotlist[i][0]);
            var start = getTime(slotlist[i][0]);
            var end = getTime(slotlist[i][1]);
            var isChecked=false;
            if(this.state.selectedSlot){
                isChecked = (this.state.selectedSlot[0] === slotlist[i][0] && this.state.selectedSlot[1] === slotlist[i][1])
            }
            returntags[i] = (
                <div><Radio
                  checked={isChecked === slotlist[i][1]}
                  onChange={this.selectSlot}
                  value={slotlist[i]}
                />
                {date+'\t,'+start+' - '+end}
                <br/>
                </div>
            );
        }
        return returntags
    }

    showScheduleButton(){
        if(this.state.selectedSlot && this.state.collaborators.length){
            return (
                <Button onClick={this.scheduleMeeting} color="primary">
                    Schedule Meeting
                </Button>
            )
        }
    }

    openSnackBar(){
        this.setState({snackbarOpen: true});
    }
    render(){

        return (
            <div>
            <TextField
              placeholder="Meeting Title"
              value={this.state.taskname}
              onChange={this.onInputChange}
              helperText="Enter Meeting Title"
            />

            <br/>
            <TextField
              placeholder="Location"
              value={this.state.location}
              onChange={this.onLocationChange}
              helperText="Enter location"
            />
            <br/>
            <TextField
              placeholder="Collaborators"
              value={this.state.currentCollab}
              helperText="Enter emails of collaborators"
              onChange={this.onCollabInputChange}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  this.addCollab();
                  ev.preventDefault();
                }
              }}
            />
            <br/>
            <Button onClick={this.addCollab} color="primary">
              Add Collaborator
            </Button>
            <br/>

            {this.getCollaboratorChips()}

            <br/>
            <br/>

            <TextField
              placeholder="Duration in minutes"
              value={this.state.duration}
              onChange={this.onDurationInputChange}
              helperText="Enter Duration in minutes"
            />
            <br/>

            <br/>
            <DateTimePicker2
                text={"Search for Slots after"}
                onTimeChange={this.onStartSearchChange}
                datetime={this.state.startSearch}
                maxDate={this.state.endSearch}
            />
            <br/>

            <DateTimePicker2
                text={"Search for Slots before"}
                onTimeChange={this.onEndSearchChange}
                datetime={this.state.endSearch}
                minDate={this.state.startSearch}
            />
            <br />

            <Button onClick={this.findSlots} color="primary">
              Find Slots
            </Button>

            <br/>
            <SubTaskcard>
            {this.slotsList()}
            </SubTaskcard>
            <br/>

            {this.showScheduleButton()}

            <Snackbar
                open={this.state.snackbarOpen}
                message="Meeting added to your schedule"
                autoHideDuration={2000}
                onClose={this.handleRequestClose}
                onRequestClose={this.handleRequestClose}
              />
            </div>
        );
    }
}
