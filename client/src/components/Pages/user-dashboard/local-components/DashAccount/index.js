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
        <div className="conatainer">
            <div className="card">
                <a onClick={openTapTarget}>
                    <div className="card-content ">
                        <i className="material-icons " style={{ fontSize: '20vw' }}>face</i>
                        <span className="card-title grey-text text-darken-4 center-align">Account</span>
                    </div>
                </a>
            </div>
        </div>
    );

}