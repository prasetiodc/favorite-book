import axios from "axios";
//const BaseURL = 'http://localhost:3030';
const BaseURL = 'http://165.22.110.159:3030';

const GoogleAPI = axios.create({
  baseURL: 'https://www.googleapis.com'
})

const API = axios.create({
  baseURL: BaseURL
})

export { GoogleAPI, API, BaseURL };
