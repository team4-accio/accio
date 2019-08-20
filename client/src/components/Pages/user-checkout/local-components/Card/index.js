import React from "react";

import "./style.css";



function Card(props) {
    return (
        <div className="row">
            {/* <div className="col s12 m6"> */}
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title"><p>{props.name}  <button className="waves-effect waves-light btn" onClick={() => props.handleRequest(props.id)}>Request</button></p></span>

                </div>
                <div className="card-action">
                    <p>Info: {props.description}</p>
                    <p>{props.condition}</p>

                    {/* <a href="#">This is a link</a>
                        <a href="#">This is a link</a> */}
                </div>
            </div>
            {/* </div> */}
        </div >
    )
}

export default Card;