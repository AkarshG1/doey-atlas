import React from "react";
import styled from "styled-components";
import Done from '@material-ui/icons/Done';
import IconButton from 'material-ui/IconButton';

const SubTaskContainer = styled.div`
  border-style: solid;
  border-width: 0.2px;
  border-color: grey;
  border-radius: 3px;
  box-shadow: 1px 1px 6px grey;
  color: #0ae;
  transition: 0.1s;
  background-color: #fff;
  display: grid;
  & > h5 {
    grid-row: 1;
    color: #555;
    margin: 10px;
    font-size: 14px;
  }
  margin-left: 20px;
  margin-top: 5px;
  margin-right: 20px;
  &:hover {
    box-shadow: 2px 2px 15px grey;
  }
`;

const TaskButtons = styled.div`
  grid-row: 1;
  justify-self: right;
  & > Button {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    grid-row: 1;
    justify-self: right;
  }
  color: #0e0;
  padding-right: 20px;
  padding-top: 6px;
  padding-bottom: 3px;

`;

const Hovereffects = styled.div`
    &:hover{
        cursor:pointer;
        color: #0e0;
    }
`;

function SubTask(props) {
    if(props.subtaskname){
        return (
            <SubTaskContainer>
              <h5>{props.subtaskname}</h5>
              <TaskButtons>
              <IconButton>
              <Hovereffects>
                  <Done
                      onClick={() => {
                          props.deleteTask(props.i);
                          }}
                  />
              </Hovereffects>
              </IconButton>
              </TaskButtons>
            </SubTaskContainer>
    );}else{
    return <p/>
}
}

export default SubTask;
