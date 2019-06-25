import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./Classes.css";


class ClassList extends Component {
    state = {
        className: "",
        position: "",
        category: "",
        saveEnabled: false
      };
    
      // Update state whenever an input field is edited
      handleFieldChange = (evt) => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      };
    
      /*
            Local method for validation, creating class object, and
            invoking the function reference passed from parent component
         */
      constructNewClass = (evt) => {
        evt.preventDefault();
        if (this.state.classId === null) {
          window.alert("Please select a class");
        } else {
          const _class = {
            name: this.state.className,
            position: "CLASS",
            category: "classes",

          }
          {this.props.history.push("/students/new")};
    
          // Create the class and redirect user to class list
          this.props.addClass(_class);
    
          this.setState({ saveEnabled: true });
        }
      };
    
  
  componentDidMount() {
  }


  render() {
    return (
      <React.Fragment>
        <form className="inputclass classForm">
          <div className="form-group">
            <label htmlFor="className">Class name</label>
            <input
              type="text"
              required
              autoFocus
              className="form-control"
              onChange={this.handleFieldChange}
              id="className"
              placeholder="Class name"
            />
          </div>

          <button
            type="button"
            disabled={
              !this.state.className ||
              this.state.saveEnabled
            }
            onClick={this.constructNewClass}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ClassList;
