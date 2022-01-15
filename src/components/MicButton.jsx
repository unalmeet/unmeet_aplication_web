import React from "react";
import { Stage, Layer, Rect, Circle, Arc } from "react-konva";
import { Spring, animated, SpringContext } from "react-spring";

export class MicButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width * 0.95,
      height: this.props.height,
      animate: true,
      color: false,
    };
  }

  clickMic = () => {
    // to() is a method of `Konva.Node` instances
    this.setState({
      color: !this.state.color,
    });
  };
  mouseOver = () => {
    // to() is a method of `Konva.Node` instances
    this.setState({
      width: this.props.width,
      animate: false,
    });
  };

  mouseLeave = () => {
    // to() is a method of `Konva.Node` instances
    this.setState({
      width: this.props.width * 0.95,
      animate: true,
    });
  };

  render() {
    return (
      <SpringContext pause={this.state.animate}>
        <Spring>
          {(styles) => (
            <animated.div className="Logo" style={{ margin: "10px" }}>
              <Stage
                width={this.state.width}
                height={this.state.height}
                onClick={this.clickMic}
                onMouseOver={this.mouseOver}
                onMouseLeave={this.mouseLeave}
              >
                <Layer>
                  <Circle
                    x={this.state.width / 2}
                    y={this.state.width / 2}
                    radius={this.state.width / 2}
                    fill={this.state.color ? "#029ACA" : "red"}
                  />
                  <Rect
                    x={this.state.width * 0.35}
                    y={this.state.width * 0.15}
                    width={this.state.width * 0.3}
                    height={this.state.width * 0.5}
                    fill="white"
                    cornerRadius={this.state.width * 0.2}
                  />
                  <Rect
                    x={this.state.width * 0.3}
                    y={this.state.width * 0.8}
                    width={this.state.width * 0.4}
                    height={this.state.width * 0.05}
                    fill="white"
                  />
                  <Rect
                    x={this.state.width * 0.45}
                    y={this.state.width * 0.75}
                    width={this.state.width * 0.1}
                    height={this.state.width * 0.1}
                    fill="white"
                  />
                  <Arc
                    x={this.state.width / 2}
                    y={this.state.width / 2}
                    outerRadius={this.state.width / 4}
                    innerRadius={this.state.width / 4}
                    angle={180}
                    stroke="white"
                  />
                </Layer>
              </Stage>
            </animated.div>
          )}
        </Spring>
      </SpringContext>
    );
  }
}
