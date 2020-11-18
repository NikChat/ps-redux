import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({ courses, authors, loadAuthors, loadCourses, saveCourse, ...props }) { // rest operator: assign rest of the properties to props object
  const [course, setCourse] = useState({ ...props.course }); // initial state = course passed in on props
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, []); // This will only run once, when the components mounts

  function handleChange(event) { // Centralized Change Handler
    const { name, value } = event.target; // This destructure avoids the event getting garbage collected, so that it's available within the nested setCourse callback
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course); // the course that is available in local state
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired
};

function mapStateToProps(state) { // This func determines what part of the state is passed to our component via props
  return {
    course: newCourse, // empty course we imported
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = { // Object form of mapDispatchToProps
  loadCourses, // These names are the same as the unbound thunks we imported at the top. The bound action passed in on props wins.
  loadAuthors,
  saveCourse
};

export default connect( // Connect conteiner component to Redux
  mapStateToProps,
  mapDispatchToProps // when we omit mapDispatchToProps, our component gets a dispatch prop injected automatically
)(ManageCoursePage);