import React, { Component } from "react";
import "./style.css";
import M from "react-materialize";

class Autocomplete extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            options: {
                data: props.searchData
            }
        }

    }

    componentDidMount() {
       // M.AutoInit();
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps)
        this.setState(
            {
                options: {
                    data: nextProps.searchData
                }
            }
        );
        this.initAutoComplete(this.state.options)

        //let autocomplete = document.querySelectorAll('.autocomplete');
        let options = {
            data: nextProps.searchData
        }
        //console.log(autocomplete)
        //console.log(options)
        //M.Autocomplete.init(autocomplete, options);

        //this.initAutoComplete(options)
    }

    // //creates obj of user names for autocomplete field to use
    // createSearchData(){
    //     let userList = this.state.userList;
    //     let adminList = this.state.adminList;
    //     let list = userList.concat(adminList);
    //     let tempObj = {};

    //     for(let i in list){
    //         tempObj[list[i].name]= null // can set to img link if we add profile images   'https://placehold.it/250x250'
    //     }
    //     let options = {
    //         data: tempObj
    //     };

    //     this.initAutoComplete(options);
    // }
    initAutoComplete(options) {
        console.log(options)
        if (!this.isEmpty(options.data)) {
            console.log('fired')
            let autocomplete = document.querySelectorAll('.autocomplete');
            M.Autocomplete.init(autocomplete, options);
        }
    }
    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render() {
        return (
            <div className="col s4 right">
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">search</i>
                        <input type="text" id="autocomplete-input" className="autocomplete" />
                        <label htmlFor="autocomplete-input">Autocomplete</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default Autocomplete;