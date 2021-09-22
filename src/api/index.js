import React from 'react';
import axios from 'axios';

const url = 'http://192.168.18.94:5000/register';
const loginUrl = 'http://192.168.18.94:5000/auth';
const categoriesUrl = 'http://192.168.18.94:5000/categories';
const subCategoriesUrl = 'http://192.168.18.94:5000/subcategories';
const itemsUrl = 'http://192.168.18.94:5000/items';

export const loginUser = data => axios.post(loginUrl, data);
export const registerUser = data => axios.post(url, data);
export const getCategories = () => axios.get(categoriesUrl);
export const getSubCategories = () => axios.get(subCategoriesUrl);
export const getItems = () => axios.get(itemsUrl);
