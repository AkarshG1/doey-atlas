import axios from 'axios';
axios.defaults.headers.common['Authorization'] =localStorage.getItem('auth_token');

export function GetData(endpoint,onSuccess) {
    let BaseURL = 'https://doey-atlas-back-end.herokuapp.com/';
    axios.get(BaseURL + endpoint)
      .then((response)=>{console.log(response),onSuccess(response)})
      .catch((error)=>console.log(error));

}
