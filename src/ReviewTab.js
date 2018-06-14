import React, {Component} from "react";
import styled from "styled-components";
import {isThisPeriod, getDate} from "./dateTimeHelpers.js";
import {GetData} from "./getData";

const Plan = styled.div`
  max-height:850px;
  display: grid;
  color: #0ae;
  grid-template-columns: 80% 20%;
  @media only screen and (max-width: 800px) {
    grid-template-columns:100%;
    &>div{
      grid-column:1;
    }
    #add{
      position:fixed;
    }
  }
`;

const Stats = styled.div`
  grid-column: 2;
  padding:10px;
  text-align:center;
  margin: 5px;
  background-color: #fff;
  border-style: solid;
  border-width: .5px;
  border-color: #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #ccc;
`;

const SubTaskcard = styled.div`
  grid-column: 1;
  margin: 5px;
  text-align:center;
  padding: 10px;
  background-color: #fff;
  border-style: solid;
  border-width: .5px;
  border-color: #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #ccc;
`;

export default class ReviewTab extends Component{
    constructor(props){
        super(props)
        this.state = {
            tasklist: JSON.parse(localStorage.getItem('alltasks')),
        }
        this.getNumberTasks = this.getNumberTasks.bind(this)
        this.getThisPeriodTasks = this.getThisPeriodTasks.bind(this)
        this.getCompletionRate = this.getCompletionRate.bind(this)
    }

    componentWillMount(){
         GetData('alltasks',(response)=>localStorage.setItem('alltasks',JSON.stringify(response.data)));
    }

  getNumberTasks(tasklist=this.state.tasklist, period='past'){
    var thisPeriodTasklist =  this.getThisPeriodTasks(tasklist, period)
    return tasklist.length
  }

  getThisPeriodTasks(tasklist=this.state.tasklist, period='past'){
      var thisPeriodTasklist = tasklist;
      const period2 = period;
      for(var i=0;i<thisPeriodTasklist.length;i++){
          if( !isThisPeriod(thisPeriodTasklist[i].start,period2)){
              thisPeriodTasklist.splice(i,1);
              i--;
          }
      }
      return thisPeriodTasklist
  }

  getCompletionRate(tasklist=this.state.tasklist, period='past'){
    const periodTasklist =  this.getThisPeriodTasks(tasklist,period)
    var totalTasks =  this.getNumberTasks(periodTasklist)
    var completedTasks = 0;
    var deletedTasks = 0;

    for(var i=0; i<totalTasks; i++){
            if(tasklist[i].status==='complete'){
                completedTasks++;
            }else if(tasklist[i].status==='deleted' ){
                deletedTasks++;
            }
    }

    const completionRate = completedTasks/(totalTasks-deletedTasks)*100;
    return completionRate.toPrecision(3)+'%'
  }

  render(){
   return (
    <Plan>
      <SubTaskcard>
        <h2>Performance Statistics</h2>
        <h5> Total Number of Tasks so Far : {this.getNumberTasks(this.state.tasklist)}</h5>
        <h5> Completion Rate : {this.getCompletionRate(this.state.tasklist)}</h5>
        <h5> Tasks last week : {this.getNumberTasks(this.state.tasklist,'lastWeek')}</h5>
        <h5> Tasks this week : {this.getNumberTasks(this.state.tasklist,'thisWeek')}</h5>
      </SubTaskcard>
      <Stats>

      Thanks for trying out this very basic prototype of doey.<br/>
      The main review features are still being worked on at the moment and
      <br/> will be released in the coming weekly or monthly updates.
      <br/>
      </Stats>

    </Plan>
    );
    }
}
