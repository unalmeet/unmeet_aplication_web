import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
export class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Button">
          <Stage width={250} height={70}>
            <Layer>
              <Rect x={5} y={5} width={240} height={60} fill={this.props.color} cornerRadius={10}/>
              <Text x={40} y={25} text={this.props.text} fontSize={30} fontFamily="system-ui" fill = {this.props.textColor} align="center"/>
            </Layer>
          </Stage>
      </div>
    );
  }
}
