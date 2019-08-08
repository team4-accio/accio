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
      // set session storage below
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col s10" />
            <form onSubmit={this.handleSubmit}>
              <label>
                Email <span class="req">*</span>
                <input
                  type="email"
                  name="email"
                  class="width-50"
                  onChange={this.handleChange}
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  class="width-50"
                  onChange={this.handleChange}
                />
              </label>
              <p>
                <button button type="submit" class="btn btn-blue">
                  Log in
                </button>
                <button class="btn">Cancel</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
