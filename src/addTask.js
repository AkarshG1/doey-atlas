import React,{Component} from "react";
import styled from "styled-components";
import {Button} from "./Buttons.js";
import {postData} from "./postData.js";
import DatePicker2 from "./datePicker.js";
import TimePicker2 from "./timePicker.js";
import {Redirect} from 'react-router-dom';

const AddTaskContainer = styled.div`
  display:grid;
`;

const PickerContainer = styled.div`
  align-self:center;
  justify-self:center;
`;
const SubmitButton = Button.extend`
    height:50px;
    width:50px;
    text-align:center;
    border-radius:50%;
    justify-self:center;
    font-size:30px;
    &:hover{
      box-shadow: 5px 5px 5px grey;
    }
    &:active{
      box-shadow:none;
    }
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

export default class addTask extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskName : "",
            redirectToDoey:false
        }
        this.handleClick = this.handleClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onDeadlineInputChange = this.onDeadlineInputChange.bind(this);
        this.onStartChange = this.onStartChange.bind(this);
        this.onEndChange = this.onEndChange.bind(this);
    }

    handleClick(){
        if(this.state.taskName){
        var task = {
            task_id:Date.now(),                       //Possible bug
            taskname:this.state.taskName,
            deadline:this.state.deadline?this.state.deadline:null,
            start:this.state.start?this.state.start:null,
            end:this.state.end?this.state.end:null,
            subtasks:"",
            location:this.state.location?this.state.location:null,
            status:'',
        }
        postData('add',task);
        this.setState({redirectToDoey:true})
    }
    }

    onInputChange(e) {
      this.setState({taskName: e.target.value });
    }

    onDeadlineInputChange(event,date){
        this.setState({
          deadline: Date.parse(date),
        });
    }

    onStartChange(event,time){
        this.setState({
            start:Date.parse(time),
        });
    }

    onEndChange(event,time){
        this.setState({
            end:Date.parse(time),
        });
    }

    render(){
        if (this.state.redirectToDoey) {
              return <Redirect to={'/doey'}/>
            }

        return (
          <AddTaskContainer>
            <Input
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

            <SubmitButton onClick={this.handleClick}>+</SubmitButton>

            <PickerContainer>
                <DatePicker2 text="Deadline" onDateChange={this.onDeadlineInputChange} />
                <TimePicker2 text="Start Time" onTimeChange={this.onStartChange}/>
                <TimePicker2 text="End Time" onTimeChange={this.onEndChange}/>
            </PickerContainer>

            <Input
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

            <br />
            {this.state.taskname}
            <br/>
            {this.state.deadline}
            <br/>
            {this.state.start}
          </AddTaskContainer>
        );
    }
}
