import axios from "axios";

export * from './user.ts'

if (import.meta.env.DEV) {
    console.log(`NODE_ENV is dev`);
    axios.defaults.baseURL = 'http://localhost:8001'
} else if (import.meta.env.PROD) {
    console.log('production');
    axios.defaults.baseURL = "https://api.gentelmanclub.pro"
}