import React from "react";
import "./style.css";

export default function DashUsers(props) {
    return (
        <div className="conatainer">
            <div className="card">
                <a href='/users/checkout'>
                    <div className="card-content ">
                        <i className="material-icons " style={{ fontSize: '20vw' }}>add_shopping_cart </i>

                        <span className="card-title grey-text text-darken-4 center-align">Checkout</span>

                    </div>
                </a>
            </div>
        </div>
    );
}
