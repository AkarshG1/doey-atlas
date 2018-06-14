import React,{Component} from "react";
import styled from "styled-components";
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
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import PriorityHigh from 'material-ui-icons/PriorityHigh';
import Alarm from 'material-ui-icons/Alarm';

const AddTaskContainer = styled.div`
  display:grid;
`;

const Input = styled.input`
  margin:5px;
  border-style:solid;
  border-color: #ddd;
  border-width:0.5px;
  border-radius:3px;
  color: #555;
  width:80%;
  height 30px;
  justify-self:center;
  text-align:center;
  font-size: 24px;
  margin-top:50px;
  &:focus{
    border-color:#fff;
  }
`;

const styles = {
  block: {
    maxWidth: 250,
  },

};


export default class AddTaskModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskName : "",
            redirectToDoey:false,
            urgent: false,
            important: false,
            location:'',
            deadline:null,
            start:null,
            end:null

        }
        this.handleClick = this.handleClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onDeadlineInputChange = this.onDeadlineInputChange.bind(this);
        this.onStartChange = this.onStartChange.bind(this);
        this.onEndChange = this.onEndChange.bind(this);
        this.checkImportant = this.checkImportant.bind(this);
        this.checkUrgent = this.checkUrgent.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
    }

    checkImportant() {
    this.setState({important:this.state.important?false:true});
    }

    checkUrgent() {
    this.setState({urgent:this.state.urgent?false:true});
    }

    handleClick(){
        if(this.state.taskName){
        var task = {
            task_id:Date.now(),                       //Possible bug
            taskname:this.state.taskName,
            deadline:this.state.deadline?this.state.deadline:null,
            start:this.state.start?this.state.start:Date.now(),
            end:this.state.end?this.state.end:(Date.now()+3600000),
            subtasks:"",
            location:this.state.location?this.state.location:null,
            status:'',
        }
        postData('add',task);
        this.props.close();
        this.props.success();
    }
    }

    onLocationChange(e) {
      this.setState({location: e.target.value });
    }

    onInputChange(e) {
      this.setState({taskName: e.target.value });
    }

    onDeadlineInputChange(date){
        this.setState({
          deadline: Date.parse(date),
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

    render(){
        if (this.state.redirectToDoey) {
              return <Redirect to={'/doey'}/>
            }

        const actions = [
            <Button primary={true} onClick={this.handleClick} label="Add" />

        ]

        return (
            <Dialog
              open={this.props.open}
              onClose={this.props.close}
              aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Add Task</DialogTitle>

          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              placeholder="I want to..."
              value={this.state.taskname}
              onChange={this.onInputChange}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  this.handleClick();
                  ev.preventDefault();
                }
              }}
            />
            <br />
            <br />
                <DatePicker2
                    text={"Deadline"}
                    onDateChange={this.onDeadlineInputChange}
                    date={this.state.deadline}
                />
                <br/>
                <DateTimePicker2
                    text={"Start Time"}
                    onTimeChange={this.onStartChange}
                    datetime={this.state.start}
                    maxDate={this.state.end}
                />
                <br/>
                <DateTimePicker2
                    text={"End Time"}
                    onTimeChange={this.onEndChange}
                    datetime={this.state.end}
                    minDate={this.state.start}
                />
            <br/>
            <br />
            <TextField
              placeholder="Location"
              value={this.state.location}
              onChange={this.onLocationChange}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  this.handleClick();
                  ev.preventDefault();
                }
              }}
            />

            <DialogActions>
            <Button onClick={this.handleClick} color="primary">
              Add
            </Button>
            </DialogActions>
             </DialogContent>
          </Dialog>
        );
    }
}
