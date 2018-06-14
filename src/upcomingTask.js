import React from "react";
import styled from "styled-components";
import {getTime,getDate} from "./dateTimeHelpers.js";
import Delete from 'material-ui-icons/Delete';
import Done from 'material-ui-icons/Done';

const UpTask = styled.div`
  border-style: solid;
  border-width: 0.2px;
  border-color: grey;
  border-radius: 3px;
  box-shadow: 1px 1px 6px grey;
  color: #0ae;
  transition: 0.1s;
  & > h4 {
    grid-row: 2/3;
    margin-top: 0;
    margin-bottom: 5px;
    padding-left: 5px;
  }
  margin-left: 20px;
  margin-top: 5px;
  margin-right: 20px;
  margin-bottom: 5px;
  &:hover {
    cursor: pointer;
    box-shadow: 4px 4px 15px grey;
  }
  display: grid;
  background-color: "#fff";

  & > h1 {
    grid-row: 1;
    color: #333;
    margin: 5px;
    margin-bottom: 5px;
    font-size: 24px;
  }
`;

const HeadButton = styled.h1`
  overflow:hidden;
  &:hover {
    text-shadow: 1px 1px grey;
  }
`;
const TaskButtons = styled.div`
color: #333;
  grid-row: 1;
  justify-self: right;
  display:grid;
`;

const Hovereffects = styled.div`
     grid-row: 1;
     margin:5px;
    &:hover{
        color: #5e5;
    }
`;

const Hovereffects2 = styled.div`
     grid-row: 1;
     margin:5px;
    &:hover{
        color: #e55;
    }
`;

function UpcomingTask(props) {
  return (
    <UpTask status={props.status}>
      <HeadButton onClick={() => props.changeToTask(props.i)}>
        {props.taskname}
      </HeadButton>
      <TaskButtons>
          <Hovereffects2>
            <Delete
                onClick={() => {
                  props.deleteTask(props.i);
                }}
            />
          </Hovereffects2>
          <Hovereffects>
            <Done
                onClick={() => {
                    props.doneTask(props.i);
                    }}
            />
        </Hovereffects>
     </TaskButtons>
      <h4>
        {getTime(props.start)} - {getTime(props.end)}
        {props.status}
      </h4>
      <h4>{props.deadline?getDate(props.deadline):null}</h4>
    </UpTask>
  );
}

export default UpcomingTask;
