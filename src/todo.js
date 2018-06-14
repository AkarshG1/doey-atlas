 import React from "react";
import { Button } from "./Buttons.js";
import styled from "styled-components";

const SubmitButton = Button.extend`
    border-radius:50%;
`;

const Input=styled.input`
margin:5px;
border-style:solid;
border-color: #ddd;
border-width:0.5px;
border-radius:3px;
width:80%;
height 30px;
margin-left: 20px;
margin-top: 15px;
margin-right: 20px;
`;

function AddSubTask (props) {
  return (
    <div>
      <Input
        placeholder="Enter TODO"
        value={props.currentTodo}
        onChange={props.onInputChange}
        onKeyPress={(ev) => {
          console.log(`Pressed keyCode ${ev.key}`);
          if (ev.key === 'Enter') {
            props.onClick();
            ev.preventDefault();
          }}}
      />
      <SubmitButton onClick={props.onClick}>+</SubmitButton>
    </div>
  );
}

export default AddSubTask;
