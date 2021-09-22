import {combineReducers} from 'redux';
import register from './register';
import categories from './categories';
import subCategories from './subCategories';
import items from './items';

export default combineReducers({
  register,
  categories,
  subCategories,
  items,
});
