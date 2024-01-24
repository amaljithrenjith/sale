// reducers.js
import { ADD_HEADER, ADD_DETAIL, REMOVE_DETAIL } from './actions';

const initialState = {
  headerData: [],
  detailData: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HEADER:
      return {
        ...state,
        headerData: [...state.headerData, action.payload],
      };
    case ADD_DETAIL:
      return {
        ...state,
        detailData: [...state.detailData, action.payload],
      };
    case REMOVE_DETAIL:
      return {
        ...state,
        detailData: state.detailData.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;

