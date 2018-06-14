import React, { Component } from "react";
import Task from "./CurrTask.js";
import styled from "styled-components";
import SubTask from "./subtasks.js";
import { Button } from "./Buttons.js";
import UpcomingTask from "./upcomingTask.js";
import AddSubTask from "./todo.js";
import {GetData} from "./getData.js";
import {postData} from "./postData.js";
import {isToday,isTomorrow,getTime,isLater,isBackLog,getDate} from "./dateTimeHelpers.js";
import {Redirect,Link} from "react-router-dom";


const Execute = styled.div`
  max-height: 850px;
  display: grid;
  grid-template-columns: 32% 36% 32%;
  @media only screen and (max-width: 800px) {
    grid-template-columns: 100%;
    & > div {
      grid-column: 1;
    }
    .nowTask{
     grid-row:1;
    }
    #add {
      position: fixed;
    }
  }
`;

const NowTask = styled.div`
  grid-column: 2;
  margin: 5px;
  background-color: #fff;
  border-style: solid;
  border-width: 0.5px;
  border-color: #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #ccc;
`;

const SubTaskcard = styled.div`
  grid-column: 1;
  height: 90vh;
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

const Upcoming = styled.div`
  grid-column: 3;
  height: 90vh;
  overflow-y:scroll;
  margin: 5px;
  background-color: #fff;
  border-style: solid;
  border-width: 0.5px;
  border-color: #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #ccc;
  h2 {
    text-align: center;
    margin: 20px;
    color: 0ae;
  }

 color: #0ae;
`;

const TaskDate = styled.div`
margin: 2px;
background-color: #fff;
border-style: solid;
border-width: 0.5px;
border-color: #ccc;
border-radius: 5px;
box-shadow: 2px 2px 5px #ccc;
`;



export default class DoeyTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks')),
      addSubTask: "",

    };

    if(this.state.tasks){
        var tasklist = this.state.tasks;
        for(var i=0;i<tasklist.length;i++){
            const status = tasklist[i].status;
            if (status === 'complete' || status === 'deleted'){
                tasklist.splice(i,1)
            }
        }
        this.setState({tasks:tasklist});
        console.log(tasklist);
    }

    this.nextTasks = this.nextTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.deleteSubTask = this.deleteSubTask.bind(this);
    this.doneTask = this.doneTask.bind(this);
    this.addSubTask = this.addSubTask.bind(this);
    this.subTasks = this.subTasks.bind(this);
    this.addSubTask = this.addSubTask.bind(this);
    this.onSubTaskInputChange = this.onSubTaskInputChange.bind(this);
    this.changeToTask = this.changeToTask.bind(this);
    this.backLogTasks = this.backLogTasks.bind(this);
    this.checkAndClassify = this.checkAndClassify.bind(this);
  }

  componentWillUpdate(){
      localStorage.setItem('tasks',JSON.stringify(this.state.tasks))
      console.log('localStorage',JSON.parse(localStorage.getItem('tasks')));
      var tasks = this.state.tasks;
      console.log(tasks);
      postData('update',tasks);
      GetData('tasks',(response)=>localStorage.setItem('tasks',JSON.stringify(response.data)));
  }

  deleteTask(i) {
    let todosCopy = this.state.tasks.slice();
    let task = this.state.tasks[i];
    task.status = "deleted";
    todosCopy.splice(i, 1);
    todosCopy.push(task);
    this.setState({ tasks: todosCopy });
  }

  doneTask(i) {
    if (this.state.tasks[i]) {
      let todosCopy = this.state.tasks.slice();
      let task = this.state.tasks[i];
      task.status = "complete";
      todosCopy.splice(i, 1);
      todosCopy.push(task);
      this.setState({ tasks: todosCopy });
    }
  }

    tomorrowTasks() {
      var i;
      var returntags = [<h2>Tomorrow</h2>];
      return this.checkAndClassify(isTomorrow,returntags,i)
    }

    todayTasks(){
      var i;
      var returntags = [<h2>Today</h2>];
      return this.checkAndClassify(isToday,returntags,i)
    }

    backLogTasks(){
        var i;
        var returntags = [<h2>Backlog</h2>];
        return this.checkAndClassify(isBackLog,returntags,i)
      }

    nextTasks() {
      var i;
      var returntags = [<h2>Later</h2>];
      return this.checkAndClassify(isLater,returntags,i)
        }

    checkAndClassify(dateCheck,returntags,i){
         for (i = 1; i < this.state.tasks.length; i++) {
            if( dateCheck((this.state.tasks[i].start)) && this.state.tasks[i].status !=='deleted' && this.state.tasks[i].status !=='complete' )
               returntags[i] = (
                   <UpcomingTask
                   {...this.state.tasks[i]}
                   deleteTask={this.deleteTask}
                   doneTask={this.doneTask}
                   changeToTask={this.changeToTask}
                   i={i}
                  />
               );
          }

         if (returntags.length===1){
             return null
         }
         return (<TaskDate>
             {returntags}
             </TaskDate>);
         }

  subTasks() {
    var i;
    var returntags = [];
    if(this.state.tasks){
        if (this.state.tasks[0]) {
          for (i = 0; i < this.state.tasks[0].subtasks.length; i++) {
            returntags[i] = (
              <SubTask
                subtaskname={this.state.tasks[0].subtasks[i]}
                deleteTask={this.deleteSubTask}
                i={i}
              />
            );
          }
        }
    }
    return returntags;
  }

  deleteSubTask(i) {
    let todoslist = this.state.tasks;
    todoslist[0].subtasks = this.state.tasks[0].subtasks.slice();
    todoslist[0].subtasks.splice(i, 1);
    this.setState({ tasks: todoslist });
  }

  addSubTask() {
    if (this.state.addSubTask) {
      let todoslist = this.state.tasks;
      todoslist[0].subtasks = this.state.tasks[0].subtasks.slice();
      todoslist[0].subtasks.push(this.state.addSubTask);
      this.setState({ tasks: todoslist, addSubTask: "" });
    }
  }

  onSubTaskInputChange(e) {
    this.setState({ addSubTask: e.target.value });
  }

  changeToTask(i) {
    let tasklist = this.state.tasks;
    let currTask = this.state.tasks[0];
    tasklist[0] = this.state.tasks[i];
    tasklist[i] = currTask;
    this.setState({ tasks: tasklist });
  }

  render() {
    return (
      <Execute>
        <SubTaskcard>
          <h2>Sub tasks</h2>
          {this.subTasks()}
          <AddSubTask
            onClick={this.addSubTask}
            onInputChange={this.onSubTaskInputChange}
            currentTodo={this.state.addSubTask}
          />
        </SubTaskcard>

        <NowTask className='nowTask'>
          <Task
            {...this.state.tasks[0]}
            deleteTask={() => this.deleteTask(0)}
            doneTask={() => this.doneTask(0)}
          />
        </NowTask>

        <Upcoming>
          <h2>Upcoming</h2>
            {this.backLogTasks()}
            {this.todayTasks()}
            {this.tomorrowTasks()}
            {this.nextTasks()}
        </Upcoming>

      </Execute>
    );
  }
}
