import React, {Component} from "react";
import ProgressCircle from "./circularProgress.js";
import {getTime,getDate} from "./dateTimeHelpers.js";
import LocationChip from './locationChip.js';
import ContactsChip from './contactsChip.js';

import styled from "styled-components";

import Delete from 'material-ui-icons/Delete';
import CheckCircle from 'material-ui-icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const CurrTask = styled.div`
  font-size: 24px;
  padding: 15px;
  color: #0ae;
  text-align: center;
  & > h1 {
    color: #333;
  }
  grid-column: 2;
  grid-row: 1;
  overflow:hidden;
`;

const LocationDiv = styled.div`
grid-row:1;
grid-column: 1;
`;

const ContactsDiv = styled.div`
grid-row:1;
grid-column: 2;
`;

const ChipDiv = styled.div`
  display:grid;
  grid-template-columns: 50% 50%;

`;
const Hovereffects = styled.div`
    transition: 0.2s;
    &:hover{
        cursor:pointer;
        color: #4c4;
    }
`;

const Hovereffects2 = styled.div`
    transition: 0.2s;
    &:hover{
        cursor:pointer;
        color: #e55;
    }
`;
const iconStyles = {
    width: 50,
    height: 50,
    marginRight: 15,
    marginTop: 6,
    marginBottom: 3,

};

function getProgressColor(start,end){
    if(start && end)
    var duration = end - start;
    var progress = end - Date.now()
    if(Date.now()>start && progress>0){
        if(progress/duration<0.1){
            return '#f00';
        }else{
            return '#0e3';
        }
    }else if (progress<0) {
        return '#510';
    }else{
        return '#0ae';
    }

}

function emailContact(email,subject){
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to='+email+'&su='+subject,'_blank');
}

function getDirections(location){
    var searchParams = location?location:'my+Location';
    return 'https://www.google.com/maps/search/?api=1&query='+ searchParams
}

export default function Task (props){
    return (
        <CurrTask>
          <h1>{props.taskname?props.taskname:"You're Free!"}</h1>
            {props.status}

            <ChipDiv>
                <Tooltip enterDelay={300} leaveDelay={300} placement="bottom" title="Location">
                    <LocationDiv>
                        <LocationChip id="locChip"
                            location={props.location?props.location:'location'}
                            handleClick={() => {
                                console.log(props.taskname)
                                window.open(getDirections(props.location),'_blank');
                        }}
                        />
                    </LocationDiv>
                </Tooltip>

                <Tooltip enterDelay={300} leaveDelay={300} placement="bottom" title="Collaborators">
                    <ContactsDiv>
                        <ContactsChip contacts={props.contacts} emailClick={emailContact}/>
                    </ContactsDiv>
                </Tooltip>
            </ChipDiv>

          <Tooltip enterDelay={300} leaveDelay={300} placement="top" title="Deadline">
            <h4>{props.deadline?getDate(props.deadline):(props.end?getDate(props.end):null)}</h4>
          </Tooltip>

          <ProgressCircle progressColor={getProgressColor(props.start,props.end)}>
            <h5>

            <Tooltip enterDelay={300} leaveDelay={300} placement="top" title="Start Time">
              <div>
                {getTime(props.start)}
              </div>
            </Tooltip>

              <hr />

            <Tooltip enterDelay={300} leaveDelay={300} placement="bottom" title="End Time">
              <div>
                {getTime(props.end)}
              </div>
            </Tooltip>
            </h5>
          </ProgressCircle>

          <br />
            <Tooltip enterDelay={300} leaveDelay={300} placement="left" title="Delete">
                <IconButton aria-label="Delete">
                <Hovereffects2>
                <Delete
                    style={iconStyles}
                    color={'e00'}
                    onClick={() => {
                      props.deleteTask(props.i);
                    }}
                />
                </Hovereffects2>
            </IconButton>
             </Tooltip>

            <Tooltip enterDelay={300} leaveDelay={300} placement="right" title="Done" >
            <IconButton>
            <Hovereffects>
              <CheckCircle
                  style={iconStyles}
                  color={'0e0'}
                  onClick={() => {
                      props.doneTask(props.i);
                      }}
              />
              </Hovereffects>
              </IconButton>
              </Tooltip>
        </CurrTask>
      );

}
