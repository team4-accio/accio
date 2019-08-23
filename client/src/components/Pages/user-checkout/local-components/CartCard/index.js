import React from "react";
import M from 'materialize-css';

function CartCard(props) {
    return (
        <div className="col s12 m6">
            <div className="card blue darken-1">
                <div className="card-content white-text">
                    <span className="card-title">{props.name}
                        <i
                            className="material-icons right"
                            onClick={() => M.toast({
                                html: 'Feature Coming Soon! <br /> Refresh to clear cart',
                                classes: 'redToast'
                            })}>remove_shopping_cart</i>
                    </span>



                </div>
                <div className="card-action white-text" >
                    <p>{props.category}</p>
                    <p>{props.condition}</p>
                </div>
            </div>
        </div>
    )
}

export default CartCard;