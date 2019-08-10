import React, { Component } from "react";
import M from "materialize-css";
import "./style.css";
import API from "../../../../../utils/API";

function validate(state) {
    // true means invalid, so our conditions got reversed
    return {
        category: state.category == null,
        name: state.name == null,
        sn: state.sn == null
    };
}

class NewItemBtn extends Component {
    state = {
        tagList: {},
        formData: {
            available: true,
            category: null,
            condition: "new",
            description: null,
            name: null,
            sn: null,
            tags: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ tagList: nextProps.tags })
        this.initChipAutoComplete({
            autocompleteOptions: {
                data: nextProps.tags,
                limit: Infinity,
                minLength: 1
            },
            onChipAdd: (event, chip) => {
                let arr = event[0].M_Chips.chipsData.map(a => a.tag);;
                this.state.formData.tags = arr;
                this.forceUpdate()
            },
            onChipDelete: (event, chip) => {
                let arr = event[0].M_Chips.chipsData.map(a => a.tag);;
                this.state.formData.tags = arr;
                this.forceUpdate()
            }
        })
    }

    componentDidMount() {

        M.AutoInit()
    
    }
    handleInputChange = (event) => {
        let field = event.target.id
        let value = event.target.value === "true"
            ? true
            : event.target.value === "false"
                ? false
                : event.target.value

        this.state.formData[field] = value;
        this.forceUpdate()
    }
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.canBeSubmitted()) {
            console.log("submitted")
            API.addNewItem(this.state.formData)
            // close modal
            // toast item added
            //refresh parent

        }
        else{
            console.log("give validation error here")
        }
    }
    canBeSubmitted() {
        const errors = validate(this.state.formData);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
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
        const errors = validate(this.state.formData);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (

            <div>
                <a className="waves-effect waves-light btn-flat modal-trigger" href="#modal1"><i className="material-icons left">add</i>New Item</a>

                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Create New Item</h4>
                        <div className="divider" />
                        <div className="row">
                            <form className="col s12" onSubmit={this.handleFormSubmit}>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="name" type="text" className="validate invalid" required="" onChange={this.handleInputChange} />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="sn" type="text" className="validate invalid" onChange={this.handleInputChange} />
                                        <label htmlFor="sn">Serial Number</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s4">
                                        <select id="category" className="category-select" onChange={this.handleInputChange}>
                                            <option selected value="" disabled >Category (Req.)</option>
                                            <option value="Laptop - Mac">Laptop - Mac</option>
                                            <option value="Laptop - PC">Laptop - PC</option>
                                            <option value="iPad">iPad</option>
                                            <option value="keyboard">keyboard</option>
                                            <option value="mouse">mouse</option>
                                        </select>
                                        <label>Category</label>
                                    </div>
                                    <div className="input-field col s4">
                                        <select id="condition" className="condition-select" onChange={this.handleInputChange}>
                                            <option defaultValue value="new">New</option>
                                            <option value="good">Good</option>
                                            <option value="okay">Okay</option>
                                            <option value="bad">Bad</option>
                                        </select>
                                        <label>Condition</label>
                                    </div>
                                    <div className="input-field col s4">
                                        <select id="available" className="available-select" onChange={this.handleInputChange}>
                                            <option defaultValue value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                        <label>Available</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea id="description" className="materialize-textarea" onChange={this.handleInputChange}></textarea>
                                        <label htmlFor="description">Description</label>
                                    </div>
                                </div>
                                <label htmlFor="tag_chips">Tags</label>
                                <div className="chips chips-autocomplete" id="tags" onChange={this.handleInputChange}>

                                </div>

                            </form>
                        </div>


                    </div>
                    <div className="modal-footer">
                        {/* <a href="#!" className="modal-close waves-effect waves-green btn-flat">Create</a> */}
                        <a href="#!" disabled={isDisabled} className="waves-effect waves-green btn-flat" onClick={this.handleFormSubmit}>Create</a>
                    </div>
                </div>
            </div>

        )
    }
}

export default NewItemBtn;

