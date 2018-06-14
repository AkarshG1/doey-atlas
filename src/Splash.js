import React,{Component} from "react";
import App from "./App.js";
import styled from "styled-components";
import {postData} from './postData.js';
import GoogleLogin from 'react-google-login';
import {BrowserRouter,Route,Switch,Router,Redirect} from 'react-router-dom';
import axios from 'axios';
import {GetData} from "./getData.js";

const Theme = {
  white: {
    mainColor: "#fff",
    text1: "#333",
    text2: "#222"
  },
  dark: {
    mainColor: "#222",
    text1: "#ae0",
    text2: "#aaa"
  }
};

const Login = styled.div`
    display:grid;
    &>button{
        background-color:#00e;
        align-self:center;
        justify-self:center;
    }
    &>img{
        align-self:center;
        justify-self:center;
    }
`;

const SplashText = styled.p`
    text-align: center;
    font-family: Monospace;
    color: #0ae;
`;

const Header = styled.nav`
  background-color: #333;
  overflow: hidden;
  width: 100%;
  display: grid;
  color: #eee;
  text-align: center;
  box-shadow: 0px 3px 15px #666;
`;

const Doey = styled.p`
  font-size: 24px;
  justify-self:center;
`;

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
  padding: 15px;
  box-shadow: 2px 2px 5px #ccc;
  & > h2 {
    text-align: center;
    margin: 20px;
    color: #0ae;
  }
  text-align: center;
`;

const SubTaskcard = styled.div`
  grid-column: 1;
  height: 90vh;
  margin: 5px;
  background-color: #fff;
  border-style: solid;
  border-width: 0.5px;
  border-color: #ccc;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 2px 2px 5px #ccc;
  & > h2 {
    text-align: center;
    margin: 20px;
    color: #0ae;
  }
  text-align: center;
`;

const LoginDiv = styled.div`
  grid-row: 2;
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
const Upcoming = styled.div`
  grid-column: 3;
  height: 90vh;
  margin: 5px;
  background-color: #fff;
  border-style: solid;
  border-width: 0.5px;
  border-color: #ccc;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 2px 2px 5px #ccc;
  &>h2 {
    text-align: center;
    margin: 20px;
    color: #0ae;
  }
  text-align: center;
`;

export default class Splash extends Component{
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    };

    componentWillMount(){
         if(!localStorage.getItem('auth_token')){
             this.setState({redirect:false})
         }
         else{
             this.setState({redirect:true})
         }
     }

    handleRedirect(){
        if(localStorage.getItem('auth_token')){

            console.log('fetching userTasks')
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token');
            GetData('alltasks',
                (response)=>localStorage.setItem('alltasks',JSON.stringify(response.data)));
            GetData('tasks',
                (response)=>(localStorage.setItem('tasks',JSON.stringify(response.data)),
                this.setState({redirect: true})
                ));

        }
    }

    login(googleResponse){
        let gData;
        let BaseURL = 'http://localhost:5000/';

        console.log("Logging in");

        if (googleResponse.w3.U3) {
            gData = {
              name: googleResponse.w3.ig,
              provider: 'Google',
              email: googleResponse.w3.U3,
              provider_id: googleResponse.El,
              token: googleResponse.Zi.access_token,
              provider_pic: googleResponse.w3.Paa
            };
        }

        if (gData) {
            axios.post(BaseURL+'login',gData)
            .then((response)=>{
                console.log(response),

                localStorage.setItem('auth_token',response.data.auth_token),
                localStorage.setItem("userData", JSON.stringify(gData))
                this.handleRedirect()

            })
            .catch((error)=>console.log(error+'error logging in'));
            }

        console.log(gData)


}

    logout(){
        console.log("Logging out");
        localStorage.clear('auth_token');
        this.setState({redirect: false});
    };

    render(){
        const responseGoogle = (response) => {
            this.login(response);
        }
        if (this.state.redirect) {
            return (
                <div>
                    <Redirect to={'/doey'}/>
                    <Route path="/" render={()=><App logout={this.logout}/>}/>
                </div>
                )
        }

        return(
        <Login>
        <Header>
            <Doey>Doey</Doey>
        </Header>
        <LoginDiv>
        <GoogleLogin
          clientId="355555968186-5c3625bhidt1php2r43o99l549b330pg.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        </LoginDiv>
        <Execute>
        <SubTaskcard>
            <h2>Plan your meetings with ease.</h2>
            <br/>Doey will look for free slots in all meeting attendees' schedules and help you plan meetings.
        </SubTaskcard>

        <NowTask>
            <h2>Doey is your Task Manager</h2>
            <br/>
            With Doey, you will know what you should be doing, when you should do it, with whom and where.
            <br/>You can also add a 'sub-task' todolist to breakdown your tasks.<br/>Also, Doey will sort your tasks by Urgency as: Today, Tomorrow, and Later. Incomplete tasks will show up as 'Backlog'
        </NowTask>
        <Upcoming>
            <h2>Review Your Performance</h2>
            <br/>
            You can review your productivity and performance.<br/>Doey displays task-related stats such as completion rate, tasks last week, tasks this week etc.
            <br/><br/>Visualisations and cooler features coming soon.
        </Upcoming>
        </Execute>
        </Login>
    );
    }
}
