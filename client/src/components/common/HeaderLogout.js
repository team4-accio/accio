import React from "react";
import axios from "axios";

class HeaderLogout extends React.Component {
  state = {
    id: ""
  };

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
      .delete("/login", {
        headers: { "x-session-token": localStorage.getItem("sessionid") }
      })
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
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="id" onChange={this.handleChange} />
          </label>
          <button type="submit">Delete</button>
        </form>
      </div>
    );
  }
}

export default HeaderLogout;
