import React, { Component } from 'react';
//import M from "materialize-css";
import './style.css';
import API from '../../../../../utils/API';

class DashActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overdueCount: 0,
            pendingCount: 0
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     // this.setState({ tagList: nextProps.tags })
    // }

    componentDidMount() {
        // M.AutoInit();
        API.getAllOverdue(this.props.sessionToken).then(res => {
            this.setState({ overdueCount: res.data.length });
        });
        API.getAllPending(this.props.sessionToken).then(res => {
            this.setState({ pendingCount: res.data.length });
        });
    }

    render() {
        return (
            <div className="conatainer">
                <div className="card">
                    <a href="/action">
                        <div className="card-content ">
                            <i
                                className="material-icons "
                                style={{ fontSize: '20vw' }}
                            >
                                playlist_add_check{' '}
                            </i>

                            <span className="card-title grey-text text-darken-4 center-align">
                                Actions
                            </span>
                            <div className="divider" />

                            {this.state.pendingCount > 0 ? (
                                <p>
                                    {this.state.pendingCount} Requests Pending
                                </p>
                            ) : null}
                            {this.state.overdueCount > 0 ? (
                                <p>
                                    {this.state.overdueCount} Checkouts Overdue
                                </p>
                            ) : null}
                            {this.state.overdueCount === 0 &&
                            this.state.pendingCount === 0 ? (
                                <p>No Current Actions</p>
                            ) : null}
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default DashActions;
