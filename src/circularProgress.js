import styled from "styled-components";

const ProgressCircle = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: #fff;
  @keyframes progressShade {
    from {
      box-shadow: 0 0 5px 1px ${props => props.progressColor};
    }
    to {
      box-shadow: 0px 0px 30px 5px ${props => props.progressColor};
    }
  }
  animation: progressShade 1s infinite;
  display: grid;
  margin: 0 auto;
  & > h5 {
    align-self: center;
    font-size: 18px;
  }
  hr {
    width: 30%;
    background-color: #aaa;
    height: 1px;
    border: 0;
  }
`;

export default ProgressCircle;
