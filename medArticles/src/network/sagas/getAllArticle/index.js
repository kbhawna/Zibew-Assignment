import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
} from '../../../redux/actions/user';

import {makeNetworkCall} from '../../index';
import {apiCodes} from '../../../utils/index';

function getArticleListAPI(action) {
  const {payload} = action;
  //const {ARTICLE_ENDPOINT} = apiEndPoints;
  console.log('...getArticle', payload);

  const config = {
    method: 'post',
    url: 'http://bookmeds.com/api/GetArticles',
    data: payload.data,
    //headers: payload.data.data.headers
  };
  return makeNetworkCall(config);
}

function* getArticleList(action) {
  console.log('Article List....');
  try {
    const response = yield call(getArticleListAPI, action);

    const {data = {}} = response;
    if (response.status === apiCodes.API_RESPONSE_SUCCESS) {
      yield put({
        type: GET_ARTICLE_SUCCESS,
        payload: {data},
      });
    } else {
      yield put({
        type: GET_ARTICLE_ERROR,
        payload: {error: response},
      });
    }
  } catch (error) {
    yield put({type: GET_ARTICLE_ERROR, payload: {error: error}});
  }
}

export function* getArticleWatcherSaga() {
  console.log('WWater Saga...');
  yield takeLatest(GET_ARTICLE_REQUEST, getArticleList);
}
