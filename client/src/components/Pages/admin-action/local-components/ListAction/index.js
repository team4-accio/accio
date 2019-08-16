import React from "react";
import "./style.css";

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
const userInfoStyle = {
  float: "left"
};

function ListAction(props) {
  //console.log(props)
  return (

    <li className="collection-item avatar">
      <div id="userInfo" style={userInfoStyle}>
        <p>

          Username: {props.action.name}<br />
          Description: {props.action.checkouts[0].items[0].description} <br />
          Checkout Date: {props.action.checkouts[0].out} to {props.action.checkouts[0].return}<br /> 
       </p>

      </div>
      {props.type === "Pending" ?
        <div id="approveDeny">
          <a className="waves-effect waves-light btn-large" id="denyButton" style={denyStyle}>Deny</a>
          <a className="waves-effect waves-light btn-large" id="approveButton" style={approveStyle}>Approve</a>
        </div>
        : null
      }
      {props.type === "Out" ?
        <div id="outCheckIn">
          <a className="waves-effect waves-light btn-large" id="checkInButton" style={approveStyle}>Check-In</a>
        </div>
        : null
      }
      {props.type === "Overdue" ?
        <div id="overdueCheckIn">
          <a className="waves-effect waves-light btn-large" id="checkInButton" style={approveStyle}>Check-In</a>
        </div>
        : null
      }
    </li>

  );
}

export default ListAction;

