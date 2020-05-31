export const GET_ARTICLE_REQUEST = 'GET_ARTICLE_REQUEST';
export const GET_ARTICLE_SUCCESS = 'GET_ARTICLE_SUCCESS';
export const GET_ARTICLE_ERROR = 'GET_ARTICLE_ERROR';

export const getAllArticles = (data) => {
  console.log('data: ', data);
  return {type: GET_ARTICLE_REQUEST, payload: {data}};
};
