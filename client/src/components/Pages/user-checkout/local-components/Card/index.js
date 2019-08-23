import React from "react";

import "./style.css";



function Card(props) {
    return (
        <div className="row">
            {/* <div className="col s12 m6"> */}
            <div className="card blue darken-1">
                <div className="card-content white-text">
                    <span className="card-title">
                        {props.name}

                        {/* <button className="waves-effect waves-light btn" onClick={() => props.handleRequest(props.id)}>Request</button> */}
                    </span>
                    <p>Info: {props.description}</p>
                    <p>{props.condition}</p>
                </div>
                <div className="card-action white-text">

                    <a className='white-text'>
                        <i
                            className="material-icons right"
                            onClick={() => props.handleRequest(props.id)}
                        >add_shopping_cart</i>
                    </a>
                    {/* <a href="#">This is a link</a>
                        <a href="#">This is a link</a> */}
                </div>
            </div>
            {/* </div> */}
        </div >
    )
}

export default Card;