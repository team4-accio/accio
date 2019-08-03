import React from "react";
import "./style.css";


function HistoryElem(props) {
    //console.log(props)
    return (

        <li className="collection-item avatar">
            <span className="title">{props.items[0].category}</span>
            <p>{props.status} <br />
                {props.out} to {props.return} </p>
        </li>

    );
}

export default HistoryElem;

