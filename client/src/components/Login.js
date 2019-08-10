import React from "react";

import axios from "axios";

export default class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  // handleChange = event => {
  //   this.setState({ email: event.target.value, password: event.target.value });
  //   console.log(event.target.value);
  // };

  handleChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);

    axios
      .post(`/login`, user)
      .then(res => {
        console.log(res.headers["x-session-token"]);
        console.log(res);
        localStorage.setItem("sessionid", res.headers["x-session-token"]);
        console.log("storage", localStorage.getItem("sessionid"));
        // console.log(res.headers);
        // console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s10" />
            <form onSubmit={this.handleSubmit}>
              <label>
                Email <span className="req">*</span>
                <input
                  type="email"
                  name="email"
                  className="width-50"
                  onChange={this.handleChange}
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  className="width-50"
                  onChange={this.handleChange}
                />
              </label>
              <p>
                <button type="submit" className="btn btn-blue">
                  Log in
                </button>
                <button className="btn">Cancel</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
