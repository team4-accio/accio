import React from "react";
import "./style.css";


function Card(props) {
    //console.log(props)
    return (

        <div className="col s6 m4 l3">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">{props.item.serialNumber}</span>
                    <h1 className='center-align'>{props.item.available ? "In" : "Out"}</h1>
                </div>
                <div className="card-action">
                    <h3 className='center-align'
                    style={props.item.condition == "Good" ? {color: "green"} : props.item.condition == "Okay" ? {color: "yellow"}:{color: "red"}} 
                    >{props.item.condition}</h3>
                </div>
            </div>
        </div>

    );
}

export default Card;

