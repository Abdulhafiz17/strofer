import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://admin.strofer.uz/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
});