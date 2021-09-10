import React from 'react';
import axios from 'axios';

const url = 'http://192.168.18.94:5000/register';
const loginUrl = 'http://192.168.18.94:5000/auth';
const categoriesUrl = 'http://localhost:5000/itemCategories';

export const loginUser = data => axios.post(loginUrl, data);
export const registerUser = data => axios.post(url, data);
export const getCategories = () => axios.get(categoriesUrl);
