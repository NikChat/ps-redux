import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

function ManageCoursePage({ courses, authors, loadAuthors, loadCourses }) {
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

    return (
      <>
        <h2>Manage Course</h2>
      </>
    );
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

function mapStateToProps(state) { // This func determines what part of the state is passed to our component via props
  return {
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = { // Object form of mapDispatchToProps
  loadCourses, // These names are the same as the unbound thunks we imported at the top. The bound action passed in on props wins.
  loadAuthors
};

export default connect( // Connect conteiner component to Redux
  mapStateToProps,
  mapDispatchToProps // when we omit mapDispatchToProps, our component gets a dispatch prop injected automatically
)(ManageCoursePage);