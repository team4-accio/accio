import React, { Component } from "react";
import M from "materialize-css"
import API from "../../../../../utils/API"
import "./style.css";

class Card extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            editTarget: "",
            itemName: props.item.name,
            clickedEditName: false,
            clickedEditAvailability: false,
            isAvailable: props.item.available,
            clickedEditCondition: false,
            itemCondition: props.item.condition
        }
    }

    componentDidMount() {
        M.AutoInit();
        //setTimeout(() => this.resizeTextArea(), 1000);
    }

    //Not working on intitial load, only for input change
    resizeTextArea() {
        let instance = document.getElementById('itemName-' + this.props.item._id);
        M.textareaAutoResize(instance);
    }

    handleInputChange(event, source) {
        if (source === 'itemName') {
            this.setState({ itemName: event.target.value });
        }
        this.resizeTextArea();
    }
    handleFormSubmit(event) {
        event.preventDefault();

        if (this.state.editTarget === 'deleteItem') {
            this.deleteItem();
        }
        else if (this.state.editTarget === 'editItemName') {
            this.editItemName();
        }
        else if (this.state.editTarget === 'editItemAvailability') {
            this.editItemAvailability();
        }
        else if (this.state.editTarget === 'editItemCondition') {
            this.editItemCondition();
        }

    }
    // UNTESTED!!!!!!!
    deleteItem() {
        // API Call for Vallidating Password
        console.log(this.props.sessionToken)
        API.getSession(localStorage.sessionid, this.props.sessionToken)
            .then((result) => {
                console.log(result);
                API.confirmPassword(result.data.email, this.refs.passwordConfirm.value, this.props.sessionToken)
                    .then((result) => {
                        console.log(result);
                        // changes category to deleted
                        API.editItem(this.props.item._id, 'category', 'Deleted', this.props.sessionToken)
                            .then(() => {
                                this.props.updateOnItemChange(this.props.item.category);
                            });
                    })
                    .catch(result => {
                        console.log(result)
                        M.toast({
                            html: 'Incorrect Password',
                            classes: 'redToast'
                        });
                    })
            })
    }
    editItemName() {
        //API CALL TO EDIT NAME
        API.editItem(this.props.item._id, 'name', this.state.itemName, this.props.sessionToken)
            .then(() => {
                this.setState({ clickedEditName: false });
                this.props.updateOnItemChange(this.props.item.category);
            });
        this.props.updateOnItemChange(this.props.item.category);
    }
    editItemAvailability() {
        //API CALL TO EDIT AVAILABILITY
        API.editItem(this.props.item._id, 'available', !this.state.isAvailable, this.props.sessionToken)
            .then(() => {
                this.setState({ clickedEditAvailability: false, isAvailable: !this.state.isAvailable });
                this.props.updateOnItemChange(this.props.item.category);
            });
    }
    editItemCondition() {
        //API CALL TO EDIT CONDITION
        setTimeout(() => {
            API.editItem(this.props.item._id, 'condition', this.state.itemCondition, this.props.sessionToken)
                .then(() => {
                    this.setState({ clickedEditCondition: false });
                    this.props.updateOnItemChange(this.props.item.category);
                });
        }, 100);

    }

    render() {

        return (
            <div className="col s6 m4 l3">
                <div className="card white darken-1">
                    <div className="card-content">

                        {this.state.clickedEditName
                            ? <form
                                onSubmit={(event) => this.handleFormSubmit(event)}
                                onLoad={this.resizeTextArea}
                            >
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix" onClick={(event) => this.handleFormSubmit(event)}
                                        >check</i>
                                        <textarea
                                            autoFocus
                                            onClick={() => this.resizeTextArea()}
                                            value={this.state.itemName}
                                            // onLoad={() => this.resizeTextArea()}
                                            onChange={(event, source) => this.handleInputChange(event, 'itemName')}
                                            id={'itemName-' + this.props.item._id}
                                            type="text"
                                            className="materialize-textarea icon_prefix card-title"
                                        />
                                    </div>
                                </div>
                            </form>
                            : <span
                                className='card-title'
                                onClick={() => this.setState({ clickedEditName: true, editTarget: 'editItemName' })}
                            >
                                {this.state.itemName}
                            </span>
                        }

                        <p>{this.props.item.sn}</p>

                        {this.state.clickedEditAvailability
                            ? <h2
                                //onClick={() => this.editItemAvailability()}
                                className='center-align'
                            >
                                <div className="switch">
                                    <label>OUT <input type="checkbox" checked={this.state.isAvailable} onChange={() => this.editItemAvailability()} /><span className="lever"></span> IN</label>
                                </div>
                            </h2>
                            : <h2
                                onClick={() => this.setState({ clickedEditAvailability: true, editTarget: 'editItemAvailability' })}
                                className='center-align grey-text'
                            >{this.props.item.available ? "In" : "Out"}
                            </h2>
                        }

                    </div>
                    <div className="card-action">
                        {this.state.clickedEditCondition
                            ? <form action="#" >
                                <label>
                                    <input type="checkbox" onClick={(event) => { this.setState({ itemCondition: 'new' }); this.handleFormSubmit(event) }} />
                                    <span>New   </span>
                                </label> <label>
                                    <input type="checkbox" onClick={(event) => { this.setState({ itemCondition: 'good' }); this.handleFormSubmit(event) }} />
                                    <span>Good   </span>
                                </label> <label>
                                    <input type="checkbox" onClick={(event) => { this.setState({ itemCondition: 'okay' }); this.handleFormSubmit(event) }} />
                                    <span>Okay   </span>
                                </label> <label>
                                    <input type="checkbox" onClick={(event) => { this.setState({ itemCondition: 'bad' }); this.handleFormSubmit(event) }} />
                                    <span>Bad  </span>
                                </label>
                            </form>
                            : <h3 className='center-align'
                                onClick={() => this.setState({ clickedEditCondition: true, editTarget: 'editItemCondition' })}
                                style={this.state.itemCondition === "new" ? { color: "blue" } : this.state.itemCondition === "good" ? { color: "green" } : this.state.itemCondition === "okay" ? { color: "yellow" } : { color: "red" }}
                            >{this.state.itemCondition}</h3>
                        }

                        <a
                            href="#"
                            onClick={() => this.setState({ editTarget: 'deleteItem' })}
                            className='dropdown-trigger'
                            href='#'
                            data-target={'drpdwn-' + this.props.item._id}
                            data-beloworigin="false"
                        >
                            <i className="material-icons">delete_forever</i>
                        </a>
                        <div id={'drpdwn-' + this.props.item._id} className='dropdown-content'>

                            <form onSubmit={(event, source) => this.handleFormSubmit(event, this.state.editTarget)} onClick={(event) => event.stopPropagation()} onTouchStart={(event) => event.stopPropagation()}>
                                <div className="row" >
                                    <div className="input-field col s8">
                                        <input placeholder="" id={'drpdwnPassword-' + this.props.item._id} type="password" className="validate" ref="passwordConfirm" />
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

