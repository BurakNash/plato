import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  onLogin = (evt) => {
    evt.preventDefault();
    this.props
      .registerIt(this.state.email, this.state.password)
      .then((allUsers) => {
        if (allUsers.length < 1) {
          alert("No Users Found or Incorrect Info");
        } else {
          allUsers.forEach((user) => {
            let loggedIn = false;
            if (
              this.state.email === user.email &&
              this.state.password === user.password
            ) {
              loggedIn = true;
            }
            if (loggedIn === true) {
              sessionStorage.setItem("User", user.id);
              sessionStorage.setItem("Fullname", user.fullname);
              this.props.populateAppState();
              this.props.history.push("/schools");
            }
          });
        }
      });
  };

  componentDidMount() {
    if (sessionStorage.getItem("User") !== null) {
      sessionStorage.removeItem("User");
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2>Welcome</h2>

        <Form className="inputstudent form">
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              required
              onChange={this.handleFieldChange}
              id="email"
              placeholder="myemail@email.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              required
              onChange={this.handleFieldChange}
              id="password"
              placeholder="********"
            />
          </FormGroup>
          <Button
            className="btn btn-warning"
            type="submit"
            onClick={this.onLogin}
          >
            Sign In
          </Button>
          <br />
          Not a User?{" "}
          <Link className="registerlink" to="/register">
            Sign Up
          </Link>
        </Form>
      </React.Fragment>
    );
  }
}

export default Login;
