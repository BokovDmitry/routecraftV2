import axios from 'axios';
window.axios = axios;
window.axios.defaults.baseURL = import.meta.env.VITE_API_URL || window.location.origin;
window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';