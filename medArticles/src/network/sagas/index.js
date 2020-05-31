import {all} from 'redux-saga/effects';
import {getArticleWatcherSaga} from './getAllArticle';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([getArticleWatcherSaga()]);
}
