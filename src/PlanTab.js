import React, {Component} from "react";
import styled from "styled-components";
import PlanMeeting from "./planMeeting.js";

const Plan = styled.div`
  max-height:850px;
  display: grid;
  @media only screen and (max-width: 800px) {
    grid-template-rows:100%;
    &>div{
      grid-column:1;
    }
    #add{
      position:fixed;
    }
  }
`;

const Upcoming = styled.div`
  grid-row: 1;
  margin: 5px;
  background-color: #fff;
  padding:10px;
  border-style: solid;
  border-width: .5px;
  border-color: #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #ccc;
  text-align:center;
  &>h2{
    text-align:center;
    margin: 20px;
    color: #0ae;
    sont
  }
`;

export default class PlanTab extends Component{
    constructor(props) {
    super(props);
    }
    render(){
       return (

        <Plan>
          <Upcoming>
            <h2>Plan meetings with collaborators</h2><br/>
            <PlanMeeting text=""/>
          </Upcoming>
        </Plan>

      );
    }
}
