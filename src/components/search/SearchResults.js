import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchResults extends Component {
  render() {
    // console.log("search results props", this.props.searchResults);
    if (this.props.searchResults.length > 0) {
      return (
        <section className=" card searchResults">
          <h2 className="page_title ">
            Search Results for: "{this.props.searchInput}"
          </h2>
          {this.props.students.map((result) => (
            <div key={`${result}${result.id}${result.name}`} className="result_card">
              [STUDENT]<Link className="searchlinks" to={`Students/${result.id}`}>{result.name}</Link>
            </div>
            
          ))}
               {this.props.teachers.map((result) => (
            <div key={`${result}${result.id}${result.name}`} className="result_card">
              [TEACHER]<Link className="searchlinks" to={`teachers/${result.id}`}>{result.name}</Link>
            </div>
            
          ))}
        </section>
      );
    } else {
      return (
        <section className="card searchResults">
          <h1 className="page_title">
            Search Results for:{this.props.searchInput}
          </h1>
        </section>
      );
    }
  }
}

export default SearchResults;
