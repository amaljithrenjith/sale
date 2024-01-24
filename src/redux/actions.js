// actions.js
export const ADD_HEADER = 'ADD_HEADER';
export const ADD_DETAIL = 'ADD_DETAIL';
export const REMOVE_DETAIL = 'REMOVE_DETAIL';

export const addHeader = (headerData) => ({
  type: ADD_HEADER,
  payload: headerData,
});

export const addDetail = (detailData) => ({
  type: ADD_DETAIL,
  payload: detailData,
});

export const removeDetail = (index) => ({
  type: REMOVE_DETAIL,
  payload: index,
});
