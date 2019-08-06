import React from "react";
import axios from "axios";

export default class Login extends React.Component {
  state = {
    useremail: "",
    userpassword: ""
  };

  handleChange = event => {
    this.setState({ useremail: event.target.value });
    this.setState({ userpassword: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      useremail: this.state.useremail,
      userpassword: this.state.userpassword
    };

    axios
      .post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
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
                <input type="email" name="useremail" class="width-50" />
              </label>

              <label>
                Password
                <input type="password" name="userpassword" class="width-50" />
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
