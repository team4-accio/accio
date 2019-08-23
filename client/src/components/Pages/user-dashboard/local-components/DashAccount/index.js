import React from "react";
import "./style.css";
import M from "materialize-css";


export default function DashAccount(props) {

    function openTapTarget() {
        var elems = document.querySelectorAll('.tap-target');
        var instance = M.TapTarget.getInstance(elems[0]);
        instance.open();
    }

    return (
        // <div className="conatainer">
        //     <div className="card">
        <a onClick={openTapTarget} className="right">
            {/* <div className="card-content "> */}
            <i className="material-icons">face</i>
            <span className="" style={{ fontSize: '15px' }}>Account</span>
            {/* </div> */}
        </a>
        //     </div>
        // </div>
    );

}