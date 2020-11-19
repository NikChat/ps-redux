import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } 
  else if (actionTypeEndsInSuccess(action.type)) {  // our thunks dispatch action types that end in _SUCCESS (i.e. CREATE_COURSE_SUCCESS)
    return state - 1;                              // an action handled by multiple reducers
  }

  return state;
}
