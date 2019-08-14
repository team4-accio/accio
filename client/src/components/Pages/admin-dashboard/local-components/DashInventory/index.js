import React, { Component } from "react";
import M from "materialize-css";
import "./style.css";
import API from "../../../../../utils/API";
import "../../../../../../node_modules/react-vis/dist/style.css"
import {
    RadialChart,
    Sunburst,
    Hint,
    XYPlot,
    HorizontalRectSeries
} from 'react-vis';

// 12 colors for sunburst categories 
// if inventory has more than 12 categories will have an error
const COLORS = ["#D4F1F4", "#75E6DA", "#00ccff", "#189AB4", "#05445E", "#4682B4", "#008081", "#0080FF", "#0E4D92", "#1034A6", "#003152", "#1D2951"]

const tipStyle = {
    display: 'flex',
    color: '#fff',
    background: '#000',
    opacity: "0.6",
    alignItems: 'center',
    padding: '5px'
};
const boxStyle = { height: '10px', width: '10px' };

class DashInventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            waitingForCondition: true,
            conditionData: [],
            inCount: 0,
            outCount: 0,
            waitingForAvailability: true,
            availablityData: {},
            hoveredCell: false
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
        API.getItems()
            .then((results) => {
                let items = results.data
                let obj = {}

                for (let i in items) {
                    if (obj[items[i].category]) {
                        items[i].available
                            ? obj[items[i].category].inCount++
                            : obj[items[i].category].outCount++
                    }
                    else {
                        obj[items[i].category] = {
                            inCount: 0,
                            outCount: 0
                        }
                        items[i].available
                            ? obj[items[i].category].inCount++
                            : obj[items[i].category].outCount++
                    }
                }
                this.createAvailablityData(obj)
            })
    }
    // Turns the counted in/out items for each category into a usable object for the sunburst graph
    createAvailablityData(itemObj) {
        let data = {
            "title": "Categories",
            "clr": "#12939A",
            "children": []
        }
        Object.keys(itemObj).map((keyName, keyIndex) => {
            let tempObj = {
                bigness: 1,
                "title": keyName,
                "clr": COLORS[keyIndex],
                "children": [
                    { bigness: 1, "title": "out", "clr": "red", "size": itemObj[keyName].outCount },
                    { bigness: 1, "title": "in", "clr": "green", "size": itemObj[keyName].inCount }
                ],
                labelStyle: {
                    fontSize: 15,
                    fontWeight: 'bold'
                }
            }
            data.children.push(tempObj)
        })
        this.setState({ availablityData: data, waitingForAvailability: false })
    }


    buildValue(hoveredCell) {
        const { radius, angle, angle0 } = hoveredCell;
        const truedAngle = (angle + angle0) / 2;
        return {
            x: radius * Math.cos(truedAngle),
            y: radius * Math.sin(truedAngle)
        };
    }

    render() {
        const { hoveredCell } = this.state;
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
                                    <Sunburst
                                        hideRootNode
                                        data={this.state.availablityData}

                                        style={{ stroke: '#fff' }}
                                        onValueMouseOver={v =>
                                            this.setState({ hoveredCell: v.x && v.y ? v : false })
                                        }
                                        onValueMouseOut={v => this.setState({ hoveredCell: false })}
                                        height={300}
                                        margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
                                        getLabel={d => d.name}
                                        //getSize={d => d.bigness}
                                        getColor={d => d.clr}
                                        width={350}
                                        padAngle={() => 0.0}
                                        colorType="literal"
                                    >
                                        {hoveredCell ? (
                                            <Hint value={this.buildValue(hoveredCell)}>
                                                <div style={tipStyle}>
                                                    <div style={{ ...boxStyle, background: hoveredCell.clr }} />
                                                    {hoveredCell.title}
                                                </div>
                                            </Hint>
                                        ) : null}
                                    </Sunburst>

                                    <div style={{
                                        position: 'absolute',
                                        padding: '5px',
                                    }}>Availability</div>
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

