import React from "react";
import "./style.css";
import moment from "moment";
import M from "materialize-css";


export default function Collection(props) {

    // Creates Overdue or Out lists
    function renderCurrentList() {
        let today = moment().format('YYYY MM DD');
        return props.checkouts.map(checkout => {
            return (
                <li className="collection-item avatar">
                    <span className="title">
                        Due {moment(checkout.return).from(today)}
                    </span>
                    <p>
                        Items: {checkout.items.map((item, i) => {
                            return (i > 0)
                                ? ", " + item.name
                                : item.name
                        })}
                    </p>
                    <a onClick={openTapTarget}>Return Items</a>
                </li>
            )
        })
    }
    function renderOtherList() {
        let today = moment();
        return props.checkouts.map(checkout => {
            return (
                <li className="collection-item avatar">
                    <span className="title">
                        {moment(checkout.out).from(today)}
                    </span>
                    <p>
                        Items: {checkout.items.map((item, i) => {
                            return (i > 0)
                                ? ", " + item.name
                                : item.name
                        })}
                    </p>
                    {
                        props.listType === "History"
                            ? <p>Status: {checkout.status}</p>
                            : <a onClick={openTapTarget}>Remind Admin</a>
                    }
                </li>
            )
        })
    }

    function openTapTarget() {
        var elems = document.querySelectorAll('.tap-target');
        var instance = M.TapTarget.getInstance(elems[0]);
        instance.open();
    }


    return (
        <ul className="collection">
            {
                props.listType === "Overdue"
                    ? renderCurrentList()
                    : props.listType === "Pending"
                        ? renderOtherList()
                        : props.listType === "Out"
                            ? renderCurrentList()
                            : props.listType === "History"
                                ? renderOtherList()
                                : null
            }
        </ul>
    );
}

