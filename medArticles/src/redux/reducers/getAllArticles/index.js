// import * as globals from '../globals';
import defaultAction from '../../actions';
import {
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
} from '../../actions/user';

const initialState = {
  // ...globals,
  apiCallError: null,
  articleList: null,
};

const getArticleList = (state = initialState, action = defaultAction) => {
  const {type, payload} = action;
  console.log('Get article List..', action);
  switch (type) {
    case GET_ARTICLE_REQUEST:
      return {
        ...state,
        apiCalling: true,
        apiCallSuccess: false,
        apiCallFail: false,
        apiCallError: null,
      };
    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        apiCalling: false,
        apiCallSuccess: true,
        apiCallFail: false,
        apiCallError: null,
        articleList: payload,
      };
    case GET_ARTICLE_ERROR:
      return {
        ...state,
        apiCalling: false,
        apiCallSuccess: false,
        apiCallFail: true,
        apiCallError: payload.error,
      };
    default:
      return state;
  }
};

export default getArticleList;
