import React from "react";

function CartCard(props) {
    return (
        <div className="col s12 m6">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title"><p>{props.name} </p></span>

                </div>
                <div className="card-action" >

                    <p>{props.condition}</p>

                </div>
            </div>
        </div>
    )
}

export default CartCard;