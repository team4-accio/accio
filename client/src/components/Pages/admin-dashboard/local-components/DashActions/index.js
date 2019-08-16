import React, { Component } from "react";
import M from "materialize-css";
import "./style.css";
import API from "../../../../../utils/API";


class DashActions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            overdueCount: 0,
            pendingCount: 0,
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     // this.setState({ tagList: nextProps.tags })
    // }

    componentDidMount() {
        // M.AutoInit();
        API.getAllOverdue()
            .then((res) => {
                console.log(res)
                this.setState({ overdueCount: res.data.length })
            })
        API.getAllPending()
            .then((res) => {
                console.log(res)
                this.setState({ pendingCount: res.data.length })
            })
    }

    getActions() {

    }


    render() {

        return (

            <div className="conatainer">
                        <div className="card">
                            {/* <a href='/admin/action'> */}
                                <div className="card-content ">
                                    <i className="material-icons " style={{ fontSize: '20vw' }}>playlist_add_check </i>
    
                                    <span className="card-title grey-text text-darken-4 center-align">Actions</span>
                                    <div className="divider" />
    
                                    {this.state.pendingCount > 0
                                        ? <p>{this.state.pendingCount} Requests Pending</p>
                                        : null
                                    }
                                    {this.state.overdueCount > 0
                                        ? <p>{this.state.overdueCount} Checkouts Overdue</p>
                                        : null
                                    }
                                    {this.state.overdueCount === 0 && this.state.pendingCount === 0
                                        ? <p>No Current Actions</p>
                                        : null
                                    }
                                </div>
                            {/* </a> */}
                      
                </div>


                {/* CARD REVEAL
                <div className="card ">
                    <div className="card-content activator">
                        <i className="material-icons " style={{ fontSize: '20vw' }}>playlist_add_check </i>
                        <span className="card-title activator grey-text text-darken-4">Actions<i className="material-icons right">more_vert</i></span>
                        <p><a href="#">This is a link</a></p>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                    </div>
                </div> */}

                {/* //     <div className="col s4">
            //         <div className="card teal">
            //             {this.state.overdueCount > 0
            //                 ? <span className="badge circle red">{this.state.overdueCount}</span>
            //                 : null
            //             }
            //             <div className="card-content white-text center-align">
            //                 <i className="material-icons" style={{ fontSize: '20vw' }}>event_busy </i>
            //                 <span className="card-title">Overdue</span>
            //             </div>
            //         </div>
            //     </div>

            //     <div className="col s4">
            //         <div className="card teal">
            //             {this.state.pendingCount > 0
            //                 ? <span className="badge circle red">{this.state.pendingCount}</span>
            //                 : null
            //             }
            //             <div className="card-content white-text center-align">
            //                 <i className="material-icons" style={{ fontSize: '20vw' }}>access_time </i>
            //                 <span className="card-title">Pending</span>
            //             </div>
            //         </div>
            //     </div> */}


            </div>

        )
    }
}

export default DashActions;

