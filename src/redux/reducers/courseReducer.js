import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      // debugger; // 3. courseReducer: handles action
      return [...state, { ...action.course }];
    case types.LOAD_COURSES_SUCCESS:
      return action.courses; // whatever we return from the reducer, becomes the state
    default:
      return state;
  }
}
