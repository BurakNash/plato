import React, { Component } from "react";
//import { Link } from "react-router-dom";



class Classroomtadd extends Component {
  state = {
    classroomId:"",
    teacherId: "",
  
    saveEnabled: false
  };
  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
            Local method for validation, creating class object, and
            invoking the function reference passed from parent component
         */
  constructNewClassroomTeacher = (evt) => {
    //evt.preventDefault();
    if (this.state.classroomId === null) {
      window.alert("Please select a class");
    } else {
      const classroomTeacher = {
        
        teacherId: parseInt(this.state.teacherId),
        classroomId: ""
      };
     
      this.props.addClassroomTeacher(classroomTeacher);
      this.props.loadClassroomTeachers()
      
      //this.props.history.push("/classrooms");
      //window.location.href = "/classrooms";
      this.setState({ saveEnabled: true });
    }
  };


  componentDidMount() {
    
  }

  render() {
    
    return (
      <React.Fragment>
        <div className="studentcard"
        key={this.props.teacher.id}>
 
          <div className="studentname">
              {this.props.teacher.name}
              
              <div className="buttons">
            
              <button
                onClick={() =>
                  this.constructNewClassroomTeacher(this.props.teacher.id)
                }
                className=""
              >
                Add
              </button>
            
        
          </div>
          </div>
          </div>
          
        
        
      </React.Fragment>
    );
  }
}

export default Classroomtadd;