import axios from "axios";

export * from './user.ts'

if (import.meta.env.DEV) {
    console.log(`NODE_ENV is dev`);
    axios.defaults.baseURL = 'http://localhost:8001'
} else if (import.meta.env.PROD) {
    console.log('NODE_ENV is production');
    console.log(`API url ${import.meta.env.VITE_API_URL}`)
    axios.defaults.baseURL = import.meta.env.VITE_API_URL
}