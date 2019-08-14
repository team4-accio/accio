import React from "react";
import {
    Sunburst,
    Hint,
} from 'react-vis';

const tipStyle = {
    display: 'flex',
    color: '#fff',
    background: '#000',
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
    state = { hoveredCell: false }

    render() {
        const { hoveredCell } = this.state;
        return (

            <Sunburst
                hideRootNode
                data={this.props.data}

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
                    <Hint value={buildValue(hoveredCell)}>
                        <div style={tipStyle}>
                            <div style={{ ...boxStyle, background: hoveredCell.clr }} />
                            {hoveredCell.title}
                        </div>
                    </Hint>
                ) : null}
            </Sunburst>

        );
    }

}
