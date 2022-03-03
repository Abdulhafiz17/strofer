import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://savdo.crud.uz/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
});