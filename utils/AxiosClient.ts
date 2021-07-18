import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://example.com/api/v1';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

export function getRequest(URL:string) {
    return axiosClient.get(`/${URL}`).then(response => response);
}
/*




example usage
axiosClient.get('/user/1')
  .then(response => {
    console.log(response);
});
*/

export function postRequest(URL:string, payload:any) {
    return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export function patchRequest(URL:string, payload:any) {
    return axiosClient.patch(`/${URL}`, payload).then(response => response);
}

export function deleteRequest(URL:string) {
    return axiosClient.delete(`/${URL}`).then(response => response);
}

//interceptor example

// axios.interceptors.request.use(function (request) {
//     request.headers['Content-Type'] = 'multipart/form-data';
//     return request;
//   }, null, { synchronous: true });

//   axios.interceptors.response.use(function (response) {
//     //Dispatch any action on success
//     return response;
//   }, function (error) {
//       if(error.response.status === 401) {
//        //Add Logic to 
//              //1. Redirect to login page or 
//              //2. Request refresh token
//       }
//     return Promise.reject(error);
//   });