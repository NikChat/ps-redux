import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({ courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props }) { // rest operator: assign rest of the properties to props object
  const [course, setCourse] = useState({ ...props.course }); // initial state = course passed in on props
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course }); // This will copy the course passed in on props to state anytime a new course is passed in on props.
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]); // When our props change, we need to update our component's state.

  function handleChange(event) { // Centralized Change Handler
    const { name, value } = event.target; // This destructure avoids the event getting garbage collected, so that it's available within the nested setCourse callback
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false); // we re-enable the save button
        setErrors({ onSave: error.message }); // look CourseForm where we display the onSave error
      });
  }

  return authors.length === 0 || courses.length === 0 ? ( // hide form until the necessary data is available
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) { // This func determines what part of the state is passed to our component via props
  const slug = ownProps.match.params.slug; // Read the URL to determine if the user is trying to create a new course or edit
  const course =
    slug && state.courses.length > 0 // mapStateToProps runs every time the Redux store changes. So when courses are available,
      ? getCourseBySlug(state.courses, slug) // we'll call getCourseBySlug.
      : newCourse; // empty course we imported
  return {
    course,
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