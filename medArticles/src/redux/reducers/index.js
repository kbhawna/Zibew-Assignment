import {combineReducers} from 'redux';
import getArticleList from './getAllArticles';
const rootReducer = combineReducers({
  getArticleList,
});
export default rootReducer;
