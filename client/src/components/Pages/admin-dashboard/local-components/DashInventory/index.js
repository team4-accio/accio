import React, { Component } from "react";
import M from "materialize-css";
import "./style.css";
import API from "../../../../../utils/API";
import "../../../../../../node_modules/react-vis/dist/style.css"
import {
    RadialChart,
    XYPlot,
    LineSeries,
    HorizontalRectSeries,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalRectSeries
} from 'react-vis';

const timestamp = new Date('May 23 2017').getTime();
const ONE_DAY = 86400000;

const DATA = [
    { x0: ONE_DAY * 2, x: ONE_DAY * 3, y: 1 },
    { x0: ONE_DAY * 7, x: ONE_DAY * 8, y: 1 },
    { x0: ONE_DAY * 8, x: ONE_DAY * 9, y: 1 },
    { x0: ONE_DAY * 9, x: ONE_DAY * 10, y: 2 },
    { x0: ONE_DAY * 10, x: ONE_DAY * 11, y: 2.2 },
    { x0: ONE_DAY * 19, x: ONE_DAY * 20, y: 1 },
    { x0: ONE_DAY * 20, x: ONE_DAY * 21, y: 2.5 },
    { x0: ONE_DAY * 21, x: ONE_DAY * 24, y: 1 }
].map(el => ({ x0: el.x0 + timestamp, x: el.x + timestamp, y: el.y }));


class NewItemBtn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            waitingForCondition: true,
            conditionData: [],
            inCount: 0,
            outCount: 0,
            waitingForAvailability: true
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     // this.setState({ tagList: nextProps.tags })
    // }

    componentDidMount() {
        // M.AutoInit();
        this.getItemConditions()
        this.getItemAvailability()

    }

    getItemConditions() {
        API.searchItems('condition', 'new')
            .then((res) => {
                //this.setState({ newCount: res.data.length })
                setTimeout(this.setState(prevState => ({
                    conditionData: [...prevState.conditionData, {
                        angle: res.data.length,
                        color: "00ccff"
                    }]
                })), 1000);
            })
        API.searchItems('condition', 'good')
            .then((res) => {
                //this.setState({ goodCount: res.data.length })
                this.setState(prevState => ({
                    conditionData: [...prevState.conditionData, {
                        angle: res.data.length,
                        color: "green"
                    }]
                }))
            })
        API.searchItems('condition', 'okay')
            .then((res) => {
                //this.setState({ okayCount: res.data.length })
                this.setState(prevState => ({
                    conditionData: [...prevState.conditionData, {
                        angle: res.data.length,
                        color: "yellow"
                    }]
                }))
            })
        API.searchItems('condition', 'bad')
            .then((res) => {
                this.setState(prevState => ({
                    conditionData: [...prevState.conditionData, {
                        angle: res.data.length,
                        color: "red"
                    }]
                }))
                this.setState({ waitingForCondition: false })
            })
        // I don't like putting wFC above in case of API error, but running into async issues below 
        // this.setState({ waitingForCondition: false })
    }

    getItemAvailability() {
        API.searchItems('available', true)
            .then((res) => {
                //this.setState({ newCount: res.data.length })
                this.setState({ inCount: res.data.length })
            })
        API.searchItems('available', false)
            .then((res) => {
                //this.setState({ newCount: res.data.length })
                this.setState({ outCount: res.data.length, waitingForAvailability: false })
            })
    }


    render() {

        return (

            <div className="conatainer">
                <div className="card">
                    <a href='/admin/inventory'>
                        <div className="card-content ">
                            <span className="card-title grey-text text-darken-4 center-align">Inventory</span>
                            <div className="divider" />

                            {this.state.waitingForCondition
                                ? (<div className="progress">
                                    <div className="indeterminate"></div>
                                </div>)
                                : (<div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <RadialChart
                                        data={this.state.conditionData}
                                        innerRadius={100}
                                        radius={140}
                                        width={300}
                                        height={300}
                                        // animation only works when new data is passed into it, state change refreshes whole component
                                        // setTimeout seems to be a quick fix
                                        animation
                                        colorType="literal" />
                                    <div style={{
                                        position: 'absolute',
                                        padding: '5px',
                                    }}>Condition</div>
                                </div>)
                            }

                            {this.state.waitingForAvailability
                                ? (<div className="progress">
                                    <div className="indeterminate"></div>
                                </div>)
                                : (<div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <XYPlot
                                        width={300}
                                        height={300} >
                                        <HorizontalRectSeries
                                            data={[{ x: this.state.outCount, x0: 0, y: 5, y0: 0, color: "red" },
                                            { x: this.state.inCount, x0: this.state.outCount, y: 5, y0: 0, color: "blue" }]}
                                            animation
                                            colorType="literal"
                                        />
                                    </XYPlot>

                                    <div style={{
                                        position: 'absolute',
                                        padding: '5px',
                                    }}>Availability</div>
                                </div>)
                            }

                        </div>
                    </a>

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

export default NewItemBtn;

