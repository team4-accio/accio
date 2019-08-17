import React, { Component } from "react";
import M from "materialize-css";
import "./style.css";

class StatusChanger extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            field: props.field,
            status: props.status,
            userName: props.userName,
            editStatus: props.editStatus
        }
    }

    componentDidMount() {
        M.AutoInit();
    }

    changeEditStatus() {
        this.setState({ editStatus: !this.state.editStatus });
    }
    changeUserStatus() {
        //CALL TO CHANGE USER STATUS
        //    //determine field to change based on this.state.field
        
        
        
        // Might add password verification instead of switch

        this.setState({ editStatus: !this.state.editStatus });
        //TESTING CHANGE
        this.props.parent.updateUserState(this.state.field)
    }

    render() {
        return (
            this.state.editStatus ?
                <div className="switch">
                    <label>
                        Are you sure?
      <input type="checkbox" onChange={() => this.changeUserStatus()} />
                        <span className="lever" ></span>
                        Yes
    </label>
                </div>
                : <a href="#" onClick={() => this.changeEditStatus()}><i className="material-icons tiny" >edit</i></a>

        );
    }

}

export default StatusChanger;

