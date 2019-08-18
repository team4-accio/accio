import React, { Component } from "react";
import Collection from "../Collection"
import M from "materialize-css";
import "./style.css";

class DashHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //checkouts: props.checkouts
            isFirst: true
        }
    }

    componentDidMount() {
        M.AutoInit();
    }


    componentDidUpdate() {
        // when component updates (gets sorted list) collapsible needs to reinit
        M.AutoInit();
    }


    render() {
        // Bool for determining if element is the first one rendered
        let firstElem = true;
        let checkouts = this.props.checkouts;

        function renderCollapsibleItem(checkouts, isFirst, title, icon) {
            let rowState = isFirst ? "active" : ""
            if (isFirst) firstElem = false
            return (
                <li className={rowState}>
                    <div className="collapsible-header"><i className="material-icons">{icon}</i>{title}</div>
                    <div className="collapsible-body">
                        <Collection checkouts={checkouts} listType={title} />
                    </div>
                </li>
            )
        }

        return (

            <div className="conatainer">
                <div className="card">
                    <div className="card-content ">
                        <span className="card-title grey-text text-darken-4 center-align">Checkout History</span>
                        <div className="divider" />
                        <ul className="collapsible popout">
                            {
                                checkouts.overdue.length > 0
                                    ? renderCollapsibleItem(checkouts.overdue, firstElem, "Overdue", "assignment_late")
                                    : null
                            }
                            {
                                checkouts.pending.length > 0
                                    ? renderCollapsibleItem(checkouts.pending, firstElem, "Pending", "access_time")
                                    : null
                            }
                            {
                                checkouts.out.length > 0
                                    ? renderCollapsibleItem(checkouts.out, firstElem, "Out", "file_upload")
                                    : null
                            }
                            {
                                checkouts.history.length > 0
                                    ? renderCollapsibleItem(checkouts.history, firstElem, "History", "history")
                                    : null
                            }
                        </ul>


                    </div>
                </div>
            </div>
        )
    }
}

export default DashHistory;

