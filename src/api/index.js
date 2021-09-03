import React from 'react';
import axios from 'axios';

const url = 'http://192.168.18.94:5000/register';

export const registerUser = data => axios.post(url, data);
