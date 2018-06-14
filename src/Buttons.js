import styled from "styled-components";
//import { fontFamily, headingSizes, themeColors } from "./settings";

const styles = `
  border: 0;
  border-radius: 2px;
  outline: 0;
  font-size: 18px;
  color: white;
  cursor: pointer;
  transition: 0.1s;
  margin:5px;
  background-color: #0ae;
  &:hover {
    transform: scale(1.02);
    border-shadow: 2px 2px 5px grey; 
  }

  &:active {
    transform: scale(0.9);
    background-color: #09d;
  }
`;
const Button = styled.button`
  ${styles};
`;

const DeleteButton = Button.extend`
  background-color: #e66;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  &:active {
    background-color: #a44;
  }
  grid-row: 1;
  justify-self: right;
`;

const CompleteButton = Button.extend`
  background-color: #5b5;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  &:active {
    background-color: #3a3;
  }
  grid-row: 1;
  justify-self: right;
`;

const DeferButton = Button.extend`
  background-color: #ea3;

  border-radius: 15px;
  height: 30px;
  width: 30px;
  &:active {
    background-color: #a60;
  }
  grid-row: 1;
  justify-self: right;
`;

export { Button };
