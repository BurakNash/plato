import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import "./NavBar.css";
import LOGO from "./LOGO.jpg";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.routeChange = this.routeChange.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  routeChange() {
    let path = ``;
    this.props.history.push(path);
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }

  onMouseLeave() {
    this.setState({ dropdownOpen: false });
  }

  logout() {
    sessionStorage.clear();
    window.location.href = "/";
  }

  showLogout = () => {
    if (sessionStorage.getItem("Fullname") !== null) {
      return (
        <button
          className="logout btn btn-danger "
          to={"/"}
          onClick={this.logout}
        >
          Log Out
        </button>
      );
    }
  };

  render() {
    return (
      <nav>
        {this.showLogout()}

        <ul
          className="nav  mr-auto nav-justified font-weight-bold bg-muted
       "
        >
          <img className="img" src={LOGO} alt="" />
          <Dropdown
            id="Dropdown"
            className=" font-weight-bold"
            onMouseOver={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
          >
            <DropdownToggle id="Dropdown" caret>
              <strong>Database</strong>
            </DropdownToggle>
            <DropdownMenu className="DropdownMenu">
              <DropdownItem header>The Plato</DropdownItem>
              <DropdownItem divider />
              <DropdownItem className="DropdownItem" tag={Link} to="/schools">
                Schools
              </DropdownItem>

              <DropdownItem className="DropdownItem" tag={Link} to="/teachers">
                Teachers
              </DropdownItem>

              <DropdownItem className="DropdownItem" tag={Link} to="/students">
                Students
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <li className="nav-item">
            <Link id=" " className="link-1" to="/schools">
              Schools
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-1" to="/teachers">
              Teachers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-1" to="/students">
              Students
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
