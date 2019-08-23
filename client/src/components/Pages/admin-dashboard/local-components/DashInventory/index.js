import React, { Component } from "react";
//import M from "materialize-css";
import "./style.css";
import API from "../../../../../utils/API";
import "../../../../../../node_modules/react-vis/dist/style.css";
import SunburstChart from "../SunburstChart";

// 12 colors for sunburst categories 
// if inventory has more than 12 categories will have an error
const COLORS = ["#D4F1F4", "#75E6DA", "#00ccff", "#189AB4", "#05445E", "#4682B4", "#008081", "#0080FF", "#0E4D92", "#1034A6", "#003152", "#1D2951"];

class DashInventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            waitingForCondition: true,
            conditionData: {},
            inCount: 0,
            outCount: 0,
            waitingForAvailability: true,
            availablityData: {},
            conditionHoverTitle: " ",
            availablityHoverTitle: " "
        }
    }

    componentDidMount() {
        API.getItems().then(results => {
            this.sortData(results.data);
        })
    }
    // sorts data from DB to be parsed by the createData functions for the chart to use
    sortData(items) {
        let condObj = {};
        let availObj = {};

        for (let i in items) {
            if (condObj[items[i].category]) {
                condObj[items[i].category][items[i].condition + 'Count']++;
                items[i].available
                    ? availObj[items[i].category].inCount++
                    : availObj[items[i].category].outCount++
            }
            else {
                condObj[items[i].category] = {
                    newCount: 0,
                    goodCount: 0,
                    okayCount: 0,
                    badCount: 0,
                }
                condObj[items[i].category][items[i].condition + 'Count']++;

                availObj[items[i].category] = {
                    inCount: 0,
                    outCount: 0
                }
                items[i].available
                    ? availObj[items[i].category].inCount++
                    : availObj[items[i].category].outCount++
            }
        }
        this.createConditionData(condObj);
        this.createAvailablityData(availObj);
    }

    createConditionData(itemObj) {
        let data = {
            "title": "Categories",
            "clr": "#12939A",
            "children": []
        };
        Object.keys(itemObj).map((keyName, keyIndex) => {
            let tempObj = {
                bigness: 1,
                "title": keyName,
                "clr": COLORS[keyIndex],
                "children": [
                    { bigness: 1, title: "new", clr: "blue", size: itemObj[keyName].newCount },
                    { bigness: 1, title: "good", clr: "green", size: itemObj[keyName].goodCount },
                    { bigness: 1, title: "okay", clr: "yellow", size: itemObj[keyName].okayCount },
                    { bigness: 1, title: "bad", clr: "red", size: itemObj[keyName].badCount }
                ],
                labelStyle: {
                    fontSize: 15,
                    fontWeight: 'bold'
                }
            };
            data.children.push(tempObj);
        })
        this.setState({ conditionData: data, waitingForCondition: false });
    }


    // Turns the counted in/out items for each category into a usable object for the sunburst graph
    createAvailablityData(itemObj) {
        let data = {
            title: "Categories",
            clr: "#12939A",
            children: []
        };
        Object.keys(itemObj).map((keyName, keyIndex) => {
            let tempObj = {
                bigness: 1,
                title: keyName,
                clr: COLORS[keyIndex],
                children: [
                    { bigness: 1, title: "out", clr: "red", "size": itemObj[keyName].outCount },
                    { bigness: 1, title: "in", clr: "green", "size": itemObj[keyName].inCount }
                ],
                labelStyle: {
                    fontSize: 15,
                    fontWeight: 'bold'
                }
            };
            data.children.push(tempObj);
        });
        this.setState({ availablityData: data, waitingForAvailability: false });
    }
    getHoverTitle(title, source) {
        //console.log(title)
        source === "condition"
            ? this.setState({ conditionHoverTitle: title })
            : this.setState({ availablityHoverTitle: title })
    }


    render() {

        return (

            <div className="conatainer">
                <div className="card">
                    <a href='/inventory'>
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
                                    <SunburstChart
                                        chartName="condition"
                                        data={this.state.conditionData}
                                        {...this.state}
                                        getHoverTitle={(title, source) => this.getHoverTitle(title, source)}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        padding: '5px',
                                    }}>
                                        <p className="center">Condition</p>
                                        <p className="center" >{this.state.conditionHoverTitle}</p>
                                    </div>

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
                                    <SunburstChart
                                        chartName="availability"
                                        data={this.state.availablityData}
                                        {...this.state}
                                        getHoverTitle={(title, source) => this.getHoverTitle(title, source)}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        padding: '5px',
                                    }}>
                                        <p className="center">Availabity</p>
                                        <p className="center" >{this.state.availablityHoverTitle}</p>
                                    </div>
                                </div>)
                            }

                        </div>
                    </a>

                </div>

            </div>

        )
    }
}

export default DashInventory;

