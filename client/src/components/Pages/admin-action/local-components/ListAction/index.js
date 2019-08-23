import React from "react";
import "./style.css";
import moment from "moment";
import axios from "axios";


//Inline styling for buttons
const approveStyle = {
  marginRight: '15px',
  backgroundColor: "green",
  float: "right"
};
const denyStyle = {
  backgroundColor: 'red',
  float: "right"
};
const notifyStyle = {
  marginRight: '15px',
  backgroundColor: "orange",
  float: "right"
};
const userInfoStyle = {
  float: "left"
};



class ListAction extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      action: this.props.action,
      type: this.props.type,
      notifyButton: this.props.notifyButton,
      approveButton: this.props.approveButton,
      rejectButton: this.props.rejectButton,
      checkinButton: this.props.checkinButton,
      name: "" 
    }

  }

  componentWillReceiveProps(nextProps){
    this.setState(
        {
            type: nextProps.type,
            action: nextProps.action,
            approveButton: nextProps.approveButton,
            rejectButton: nextProps.rejectButton,
            checkinButton: nextProps.checkinButton,
            notifyButton: nextProps.notifyButton

        }
    )
}
  componentDidMount() {
    this.getUsername(this.state.action.user);
}

   getUsername = userNameID => {
    console.log("getUsername function has been invoked");
    console.log(userNameID)
    axios.get("/api/users/" + userNameID, {
      headers: {
        'x-session-token': this.props.sessionToken
      }
    }
    )
        .then((response) => {
            this.setState({
              name: response.data.name
            })
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  render(){
  return (

    <li className="collection-item avatar">
      <div id="userInfo" style={userInfoStyle}>
        <p>
          Username:{this.state.name}<br />
          Description: {this.state.action.items[0].description} <br />
          Checkout Date: {moment(this.state.action.out).add(10, 'days').calendar()} to {moment(this.state.action.return).add(10, 'days').calendar()}<br /> 
       </p>

      </div>
      {this.state.type === "Pending" ?
        <div id="approveDeny">
          <a className="waves-effect waves-light btn-large" id="denyButton" style={denyStyle} onClick={() => this.state.rejectButton(this.state.action._id)}>Deny</a>
          <a className="waves-effect waves-light btn-large" id="approveButton" style={approveStyle} onClick={() => this.state.approveButton(this.state.action._id)}>Approve</a>
        </div>
        : null
      }
      {this.state.type === "Out" ?
        <div id="outCheckIn">
          <a className="waves-effect waves-light btn-large" id="checkInButton" style={approveStyle} onClick={() => this.state.checkinButton(this.state.action._id)}>Check-In</a>
        </div>
        : null
      }
      {this.state.type === "Overdue" ?
        <div id="overdueCheckIn">
          <a className="waves-effect waves-light btn-large" id="checkInButton" style={approveStyle} onClick={() => this.state.checkinButton(this.state.action._id)}>Check-In</a>
          <a className="waves-effect waves-light btn-large" id="notifyButton" style={notifyStyle} onClick={() => this.state.notifyButton(this.state.action.user)}>Notify User</a>
        </div>
        : null
      }
    </li>

  )};
}

export default ListAction;

