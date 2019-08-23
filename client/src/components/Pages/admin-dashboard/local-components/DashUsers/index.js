import React from "react";
import "./style.css";

function DashUsers(props) {
    return (
        <div className="conatainer">
            <div className="card">
                <a href='/users'>
                    <div className="card-content ">
                        <i className="material-icons " style={{ fontSize: '20vw' }}>people </i>

                        <span className="card-title grey-text text-darken-4 center-align">Users</span>

                    </div>
                </a>
            </div>
        </div>
    );
}

export default DashUsers;