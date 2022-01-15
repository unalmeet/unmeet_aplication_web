import React from "react";
import { Stage, Layer, Rect, Circle, Line, Text, Arc } from "react-konva";
import { Spring, animated, SpringContext } from "react-spring";

export class CamButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width * 0.95,
      height: this.props.height,
      animate: true,
      color: true,
    };
  }

  clickCam = () => {
    // to() is a method of `Konva.Node` instances
    this.setState({
      color: !this.state.color,
    });
    var constraints = { audio: true, video: { width: 1280, height: 720 } };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        var video = document.querySelector("video");
        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      }); // always check for errors at the end.
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
            <animated.div className="Logo" style={styles}>
              <Stage
                width={this.state.width}
                height={this.state.height}
                onClick={this.clickCam}
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
                    x={this.state.width * 0.2}
                    y={this.state.width * 0.2}
                    width={this.state.width * 0.6}
                    height={this.state.width * 0.6}
                    fill="white"
                    cornerRadius={this.state.width * 0.1}
                  />
                  <Line
                    x={this.state.width - this.state.width * 0.35}
                    y={this.state.width * 0.38}
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
                </Layer>
              </Stage>
            </animated.div>
          )}
        </Spring>
      </SpringContext>
    );
  }
}
