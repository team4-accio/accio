import React from "react";
import {
    Sunburst,
    Hint,
} from 'react-vis';

const tipStyle = {
    display: 'flex',
    color: '#000',
    // background: '#000',
    opacity: "0.6",
    alignItems: 'center',
    padding: '5px'
};
const boxStyle = { height: '10px', width: '10px' };


function buildValue(hoveredCell) {
    const { radius, angle, angle0 } = hoveredCell;
    const truedAngle = (angle + angle0) / 2;
    return {
        x: radius * Math.cos(truedAngle),
        y: radius * Math.sin(truedAngle)
    };
}
export default class SunburstChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hoveredCell: false,
            hoveredTitle: "",
            data: {
                "title": "Dummy Data",
                "clr": "#0012939A",
                "children": [
                    {
                        bigness: 1,
                        "title": "Dummy Data",
                        "clr": "transparent",
                        "size": 1,
                        children: [
                            {
                                bigness: 1,
                                "title": "Dummy Data",
                                "clr": "transparent",
                                "size": 2000,
                                children: [
                                    {
                                        bigness: 1,
                                        "title": "Dummy Data",
                                        "clr": "transparent",
                                        "size": 2000
                                    }
                                ]
                            },
                            {
                                bigness: 1,
                                "title": "Dummy Data",
                                "clr": "transparent",
                                "size": 2000
                            }
                        ]
                    },
                    {
                        bigness: 1,
                        "title": "Dummy Data",
                        "clr": "transparent",
                        "size": 1,
                        children: [
                            {
                                bigness: 1,
                                "title": "Dummy Data",
                                "clr": "transparent",
                                "size": 2000
                            },
                            {
                                bigness: 1,
                                "title": "Dummy Data",
                                "clr": "transparent",
                                "size": 2000
                            }
                        ]
                    }]
            }
        }
    }
    componentDidMount() {
        setTimeout(() => this.setState({ data: this.props.data }), 100);
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps.data)
    //     //this.setState({data: nextProps.data})
    //     setTimeout(() => this.setState({ data: nextProps.data }), 100);
    // }

    render() {
        const { hoveredCell, data } = this.state;
        return (

            <Sunburst
                hideRootNode
                data={data}

                style={{ stroke: '#fff' }}
                onValueMouseOver={v => {
                    //console.log(v)
                    this.props.getHoverTitle(v.title ? v.title : "", 'condition')
                    this.setState({ hoveredCell: true, hoveredTitle: v.title ? v.title : "" })
                }
                }
                onValueMouseOut={v => this.setState({ hoveredTitle: "", hoveredCell: false })}
                height={300}
                margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
                getLabel={d => d.name}
                //getSize={d => d.bigness}
                getColor={d => d.clr}
                width={350}
                padAngle={() => 0.0}
                colorType="literal"
                animation
            >
{/* 
                <Hint value={{
                    x: 1,
                    y: 0
                }}>
                    <div style={tipStyle}>
                        {this.state.hoveredTitle}
                    </div>
                </Hint> */}

            </Sunburst>

        );
    }

}
