import styled from "styled-components";

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

export { Button };
