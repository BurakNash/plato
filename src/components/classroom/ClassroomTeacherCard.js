import React, { Component } from "react";
//import { Link } from "react-router-dom";



class ClassroomTeacherCard extends Component {
  componentDidMount() {
    
  }

  render() {
    
    return (
      <React.Fragment>
        <div className="studentcard"
        key={this.props.classroomTeacher.id}>
 
          <div className="studentname">
              {this.props.classroomTeacher.teacher.name}
              
              <div className="buttons">
            
              <button
                onClick={() =>
                  this.props.deleteClassroomTeacher(this.props.classroomTeacher.id)
                }
                className=""
              >
                Delete
              </button>
            
        
          </div>
          </div>
          </div>
          
        
        
      </React.Fragment>
    );
  }
}

export default ClassroomTeacherCard;