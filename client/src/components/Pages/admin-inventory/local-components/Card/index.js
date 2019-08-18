import React, { Component } from "react";
import M from "materialize-css"
import API from "../../../../../utils/API"
import "./style.css";

class Card extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        M.AutoInit()

    }
    deleteItem() {
        API.deleteItem(this.props.item._id)
        this.props.updateOnItemChange(this.props.item.category)
    }
    handleFormSubmit(event) {
        event.preventDefault();
        console.log('Submitted')
    }

    render() {

        return (
            <div className="col s6 m4 l3">
                <div className="card white darken-1">
                    <div className="card-content">

                        <span className="card-title">{this.props.item.name}</span>
                        <p>{this.props.item.sn}</p>
                        <h1 className='center-align'>{this.props.item.available ? "In" : "Out"}</h1>
                    </div>
                    <div className="card-action">
                        <h3 className='center-align'
                            style={this.props.item.condition === "new" ? { color: "blue" } : this.props.item.condition === "good" ? { color: "green" } : this.props.item.condition === "okay" ? { color: "yellow" } : { color: "red" }}
                        >{this.props.item.condition}</h3>

                        <a
                            href="#"
                            //onClick={() => this.deleteItem()}
                            className='dropdown-trigger'
                            href='#'
                            data-target={'drpdwn-' + this.props.item._id}
                            data-beloworigin="false"
                        >
                            <i className="material-icons">delete_forever</i>
                        </a>
                        <div id={'drpdwn-' + this.props.item._id} className='dropdown-content'>

                            <form onSubmit={(event) => this.handleFormSubmit(event)} onClick={(event) => event.stopPropagation()} onTouchStart={(event) => event.stopPropagation()}>
                                <div className="row" >
                                    <div className="input-field col s8">
                                        <input placeholder="" id={'drpdwnPassword-' + this.props.item._id} type="password" className="validate" />
                                        <label htmlFor={'drpdwnPassword-' + this.props.item._id}>Confirm Password</label>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Card;

