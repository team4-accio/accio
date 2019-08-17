import React, { Component } from "react";
import M from "materialize-css";
import "./style.css";


class DashAnalytics extends Component {

    componentDidMount() {
        M.AutoInit();
    }
    openTapTarget() {
        var elems = document.querySelectorAll('.tap-target');
        var instance = M.TapTarget.getInstance(elems[0]);
        instance.open();
    }

    render() {
        return (
            <div className="conatainer">
                <a href="#" id="menu" className="waves-effect waves-light btn btn-floating " style={{ opacity: "0", position: "fixed", bottom: 0, right: 0 }}><i className="material-icons">whatshot</i></a>
                <div className="card">
                    <a href="#" onClick={this.openTapTarget}>
                        <div className="card-content ">
                            <i className="material-icons " style={{ fontSize: '20vw' }}>multiline_chart</i>

                            <span className="card-title grey-text text-darken-4 center-align">Analytics</span>

                        </div>
                    </a>
                </div>

                <div className="tap-target" data-target="menu">
                    <div className="tap-target-content">
                        <h5>Coming Soon!</h5>
                        <p>This functionality is not completed yet.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashAnalytics;