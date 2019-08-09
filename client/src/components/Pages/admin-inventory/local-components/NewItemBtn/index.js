import React, { Component } from "react";
import M from "materialize-css";
import "./style.css";

import API from "../../../../../utils/API"

class NewItemBtn extends Component {
    state = {
       tagList: {}
    }
    componentWillReceiveProps(nextProps){
        this.setState({tagList: nextProps.tags})
        this.initChipAutoComplete({
            autocompleteOptions: {
              data: nextProps.tags,
              limit: Infinity,
              minLength: 1
            }})
    }

    componentDidMount() {

        

        M.AutoInit()
    }

    getAutocompleteData() {
    
    }
    initChipAutoComplete(options) {
        console.log(options)
        let autocomplete = document.querySelectorAll('.chips');

        M.Chips.init(autocomplete, options);
    }



    //  //   available   type: boolean   required
    //  //   category    type: string (enum) enums: Laptop - Mac, Laptop - PC, iPad, keyboard, mouse  required
    //  //   condition   type: string (enum) enums: new, good, okay, bad required
    //  //   description type: string    optional
    //  //   name    type: string    required
    //  //   sn  type: string    required
    //  //   tags    type: list  optional
    render() {
        return (

            <div>
                <a className="waves-effect waves-light btn-flat modal-trigger" href="#modal1"><i className="material-icons left">add</i>New Item</a>

                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Create New Item</h4>
                        <div className="divider" />
                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="item_name" type="text" className="validate" />
                                        <label htmlFor="item_name">Name</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="serial_number" type="text" className="validate" />
                                        <label htmlFor="serial_number">Serial Number</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s4">
                                        <select className="category-select">
                                            <option value="" disabled defaultValue>Category</option>
                                            <option value="Laptop - Mac">Laptop - Mac</option>
                                            <option value="Laptop - PC">Laptop - PC</option>
                                            <option value="iPad">iPad</option>
                                            <option value="keyboard">keyboard</option>
                                            <option value="mouse">mouse</option>
                                        </select>
                                        <label>Category</label>
                                    </div>
                                    <div className="input-field col s4">
                                        <select className="condition-select">
                                            <option defaultValue value="new">New</option>
                                            <option value="good">Good</option>
                                            <option value="okay">Okay</option>
                                            <option value="bad">Bad</option>
                                        </select>
                                        <label>Condition</label>
                                    </div>
                                    <div className="input-field col s4">
                                        <select className="available-select">
                                            <option defaultValue value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                        <label>Available</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea id="textarea1" className="materialize-textarea"></textarea>
                                        <label htmlFor="textarea1">Description</label>
                                    </div>
                                </div>
                                <label htmlFor="tag_chips">Tags</label>
                                <div className="chips chips-autocomplete" id="tag_chips">
                                
                                </div>
                                
                            </form>
                        </div>


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

