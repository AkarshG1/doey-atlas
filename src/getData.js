import axios from 'axios';
axios.defaults.headers.common['Authorization'] =localStorage.getItem('auth_token');

export function GetData(endpoint,onSuccess) {
    let BaseURL = 'http://localhost:5000/';
    var data;
    axios.get(BaseURL + endpoint)
      .then((response)=>{console.log(response),onSuccess(response)})
      .catch((error)=>console.log(error));

}
