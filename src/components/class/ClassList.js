import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./Classes.css";

class ClassList extends Component {


  constructor(props) {
    super(props);
    //this.state = {value: 'coconut'};
    this.state = {value: ['coconut']};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //this.setState({value: event.option});
    this.setState({value: Array.from(event.target.selectedOptions, (item) => item.value)});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  componentDidMount() {
  }


  render() {
    return (
      <React.Fragment>
     <form onSubmit={this.handleSubmit}>
            <label>
              Pick your favorite La Croix flavor:
              <select multiple={true} value={this.state.value} onChange={this.handleChange}>
              <option value="">Select an teacher</option>
              {this.props.classes.map((e) => (
                <option key={e.id} id={e.id} value={e.id}>
                  {e.name}
                </option>))}
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
      </React.Fragment>
    );
  }
}

export default ClassList;
