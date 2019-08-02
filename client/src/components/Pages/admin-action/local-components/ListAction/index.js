import React from "react";
import "./style.css";


function ListAction(props) {
    //console.log(props)
    return (

        <li className="collection-item avatar">
        <span className="title">{props.action.user}</span>
        <p>{props.action.items[0].category} <br />
        {props.action.out} to {props.action.return} </p>
        <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
      </li>

    );
}

export default ListAction;

