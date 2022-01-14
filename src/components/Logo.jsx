import React from "react";
import { Stage, Layer, Rect, Circle, Line, Text } from "react-konva";
import { Spring, animated, SpringContext, config } from "react-spring";
export class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width * 0.95,
      height: this.props.height,
      animate: true,
    };
  }

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
        <Spring
          loop
          from={{ rotateZ: 0 }}
          to={{ rotateZ: 360 }}
          config={{ duration: 1500 }}
        >
          {(styles) => (
            <animated.div className="Logo" style={styles}>
              <Stage
                width={this.state.width}
                height={this.state.height}
                onMouseOver={this.mouseOver}
                onMouseLeave={this.mouseLeave}
              >
                <Layer>
                  <Circle
                    x={this.state.width / 2}
                    y={this.state.width / 2}
                    radius={this.state.width / 2}
                    fill="#144B7D"
                  />
                  <Rect
                    x={this.state.width * 0.18}
                    y={this.state.width * 0.18}
                    width={this.state.width * 0.65}
                    height={this.state.width * 0.65}
                    fill="white"
                    cornerRadius={this.state.width * 0.1}
                  />
                  <Line
                    x={this.state.width - this.state.width * 0.35}
                    y={this.state.width * 0.4}
                    points={[
                      this.state.width / 4,
                      0,
                      this.state.width / 4,
                      this.state.width / 4,
                      0,
                      this.state.width / 8,
                    ]}
                    closed
                    fill="white"
                  />
                  <Text
                    x={this.state.width * 0.29}
                    y={this.state.width * 0.35}
                    text="UN"
                    fontSize={this.state.width * 0.4}
                    fontFamily="monospace"
                    fontStyle="Bold"
                  />
                  <Text
                    x={this.state.width * 0.2}
                    y={this.state.width}
                    text="meet"
                    fontSize={this.state.width * 0.3}
                    fontFamily="monospace"
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
