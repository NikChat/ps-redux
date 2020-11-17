import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) { // This func determines what part of the state is passed to our component via props
  // debugger; // 4. After the new course is added to the Redux store, mapStateToProps is called again
  return {
    courses: state.courses
  };
}

// We have to dispatch actions. If we just call an action creator it won't do anything. Action creators just return an object
function mapDispatchToProps(dispatch) { // This lets us declare what actions to pass to our component on props
  return {
    actions: bindActionCreators(courseActions, dispatch) // createCourse: course => dispatch(courseActions.createCourse(course))
  };
}

// const mapDispatchToProps = { // Declare mapDispatchToProps as an Object: each property is automatically bound to dispatch
//   createCourse: courseActions.createCourse
// };

export default connect( // Connect conteiner component to Redux
  mapStateToProps,
  mapDispatchToProps // when we omit mapDispatchToProps, our component gets a dispatch prop injected automatically
)(CoursesPage);
