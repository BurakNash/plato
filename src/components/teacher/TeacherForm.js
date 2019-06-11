    
import React, { Component } from 'react';


class TeacherForm extends Component {

    state = {
        name: "",
        //info: "",
        //date: new Date()
    }
    handelFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    ConstructTeacher = evt => {
        evt.preventDefault();
        const teachers = {
            name: this.state.name,
            //info: this.state.info,
            //date: this.state.date
        };
        this.props.addTeacher(teachers).then(() => this.props.history.push("/teachers"));
    }
 
    render() {
        return (
            <>
                
                    <form>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                required
                                onChange={this.handelFieldChange}
                                id="name"
                                placeholder="name"
                            />
                        </div>
                       
 
 
                        <button className="primary"
                            type="submit"
                            onClick={this.ConstructTeacher}>Add New Teacher</button>
                    </form>
                
            </>
        );
    }
 }
 
 export default TeacherForm