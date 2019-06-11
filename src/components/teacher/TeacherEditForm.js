import React, { Component } from 'react';
import TeacherManager from "../../modules/TeacherManager"



export default class TeacherEditForm extends Component {

    state = {
        name: "",
        //info: ""
    }
 
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }
 
    updateTeacher = evt => {
        evt.preventDefault()
 
        const editedTeacher = {
            id: this.props.match.params.teacherId,
            name: this.state.name,
            //info: this.state.info
        };
 
        this.props.updateTeacher(editedTeacher)
            .then(() => this.props.history.push("/teachers"))
    }
    componentDidMount() {
        TeacherManager.get(this.props.match.params.teacherId)
            .then(teachers => {
                this.setState({
                    name: teachers.name,
                    //info: teachers.info
                });
            });
    }
    render() {
        return (
          
 
                
                    <form className="teacherForm">
 
                        <div className="form-group">
                            <label htmlFor="name">Teacher name</label>
                            <input
                                type="text"
                                required
                                // className="form-control"
                                onChange={this.handleFieldChange}
                                id="name"
                                value={this.state.name || ""}
                            />
                        </div>
                        
                        
                        <div>
                            <button
                                type="submit"
                                color="danger"
                                size="sm"
                                onClick={this.updateTeacher}
                            >Submit</button>
                        </div>
 
 
                    </form>
                
 
            
            
        );
    }
 }