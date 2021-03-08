import axios from 'axios';

const api = axios.create();
api.defaults.baseURL = 'http://ragazzitech.caioragazzi.com';

api.interceptors.request.use(async (config) => {
  const token = JSON.parse(await localStorage.getItem('token'));

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response, (error) => {
//   if (error.response.data.message === 'session expired') {
//     this.$bvToast.toast('Session ativa em outro dispositivo!', {
//         title: 'Atenção',
//         autoHideDelay: 5000,
//         variant: 'danger',
//     })
//     return Promise.reject();
//   }
  return Promise.reject(error);
});

export default api;
