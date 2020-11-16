import * as types from "../actions/actionTypes";

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      // debugger; // 3. courseReducer: handles action
      return [...state, { ...action.course }];
    default:
      return state;
  }
}
