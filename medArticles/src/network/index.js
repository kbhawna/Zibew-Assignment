/*
 *
 */

import axios from 'axios';
import {
  DEFAULT_ERROR_STATUS,
  API_HEADER_CONTENT_TYPE,
  API_HEADER_CONTENT_TYPE_JSON_VALUE,
  API_RESPONSE_SUCCESS,
} from '../utils/constants/apiCodes';
//import {ARTICLE_ENDPOINT} from '../utils/constants/apiEndpoints';

/**
 * unit: milliseconds
 */
const TIMEOUT = 10000;
let BASE_URL = 'http://bookmeds.com/api/GetArticles';
const commonHeaders = {};

const AxiosServer = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

async function makeFetchNetworkCall(config) {
  //console.log('Config=', config);
  const response = {};
  const defaultErrorString = 'Some thing wrong Error ...';
  const url = BASE_URL;
  // const url = config.url;
  //commonHeaders[API_HEADER_CONTENT_TYPE] = API_HEADER_CONTENT_TYPE_JSON_VALUE;

  const headers = {
    // ...commonHeaders,
    'Content-Type': 'application/json',
  };
  console.log('input data :', JSON.stringify(config.data));
  const res = await fetch(url, {
    method: config.method,
    headers: headers,
    body: JSON.stringify(config.data),
    timeoutInterval: TIMEOUT,
  });

  try {
    if (res) {
      console.log('Real Response : ' + res);
      if (res.status === 204) {
        response.status = 200;
      } else if (res.status === 201) {
        response.status = 200;
        response.data = await res.json();
      } else {
        response.data = await res.json();
        response.status = res.status;
      }

      if (response.status !== API_RESPONSE_SUCCESS) {
        response.message = response.data.message || defaultErrorString;
        response.status = DEFAULT_ERROR_STATUS; // Dummy status but required
        if (response) {
          if (response.data) {
            response.message = response.data.message;
            response.status = response.data.status || res.status;
            response.data = response.data;
          } else {
            response.message = defaultErrorString;
            response.status = DEFAULT_ERROR_STATUS; // Dummy status but required
          }
        }
      }
    }
  } catch (e) {
    // TODO: html error from server to be handled in a clean way or with some empty state
    response.message = defaultErrorString;
    response.status = DEFAULT_ERROR_STATUS; // Dummy status but required
  }

  return response;
}
/*
 *
 */

function makeNetworkCall(config) {
  // return makeAxiosNetworkCall(config);
  return makeFetchNetworkCall(config);
}

export {AxiosServer, makeNetworkCall};
