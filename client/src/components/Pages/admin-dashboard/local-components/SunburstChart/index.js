import React from "react";
import {
    Sunburst,
    Hint,
} from 'react-vis';
import dummyData from "./initialData.json";

export default class SunburstChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chartName: props.chartName,
            hoveredCell: false,
            hoveredTitle: "",
            data: dummyData
        }
    }
    componentDidMount() {
        setTimeout(() => this.setState({ data: this.props.data }), 100);
    }

    render() {
        const { hoveredCell, data } = this.state;
        return (

            <Sunburst
                hideRootNode
                data={data}

                style={{ stroke: '#fff' }}
                onValueMouseOver={v => {
                    this.props.getHoverTitle(v.title ? v.title : "", this.state.chartName);
                    this.setState({ hoveredCell: true, hoveredTitle: v.title ? v.title : "" });
                }
                }
                onValueMouseOut={v => {
                    this.props.getHoverTitle(" ", this.state.chartName);
                    this.setState({ hoveredTitle: "", hoveredCell: false });
                }}
                height={300}
                margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
                getLabel={d => d.name}
                //getSize={d => d.bigness}
                getColor={d => d.clr}
                width={350}
                padAngle={() => 0.0}
                colorType="literal"
                animation
            />

        );
    }

}
