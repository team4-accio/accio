import React, { Component } from "react";
import M from "materialize-css";
import "./style.css";



class NewItemBtn extends Component {
    componentDidMount() {
        M.AutoInit()
    }
    render() {
        return (

            <div>
                <a className="waves-effect waves-light btn-flat modal-trigger" href="#modal1"><i className="material-icons left">add</i>New Item</a>

                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Create New Item</h4>
                        <p>A bunch of text</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Create</a>
                    </div>
                </div>
            </div>

        )
    }
}

export default NewItemBtn;

