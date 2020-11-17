import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  // debugger; // 2. createCourse
  return { type: types.CREATE_COURSE, course }; // course: course
}

export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses() { // First Thunk: returns a function, which is utilized be thunk middleware (it injects dispatch to our thunk).
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCourseSuccess(courses)); // we dispatch an action
      })
      .catch(error => {
        throw error;
      });
  };
}