import * as types from "./actionTypes";

export function createCourse(course) {
  // debugger; // 2. createCourse
  return { type: types.CREATE_COURSE, course }; // course: course
}
