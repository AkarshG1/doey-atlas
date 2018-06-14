import axios from 'axios';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token');

export function postData(endpoint,
                        Data,
                        onSuccess=()=>console.log("Success"),
                        catchError=()=>{
                            alert('There was an error contacting the server. Please try logging in again')
                        }){
    let BaseURL = 'http://localhost:5000/';
    axios.post(BaseURL + endpoint,Data)
      .then((response)=>{console.log(response),onSuccess(response)})
      .catch((error)=>{console.log(error),catchError()});
}
