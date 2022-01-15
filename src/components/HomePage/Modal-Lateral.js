import React, { Component } from "react";
/* import "./Menu-controler"; */
import "./modal-styles.css";

export default class ModalLateral extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible:false
        };

        
    }
    render(){
        const activarSideBar= this.state.visible===true ?  "active":"";
        
        
        return(
            <div>
                <div id="menu-toggle-btn">
                    <span id="menu-toggle-btn" class="btn" onClick={()=>this.setState({visible:!this.state.visible})}>{this.props.boton}</span>
                </div>
                <div class={"side-bar-container "+ activarSideBar}>
        
                    <div class={"side-bar "+ activarSideBar}>
                            <div class="body-side-bar">
                                <div class={"menu menu-pr "+activarSideBar} id="menu-pr">
                                    {this.props.content}
                                </div>
                            </div>
                    </div>
                    <div class="side-background" onClick={()=>this.setState({visible:!this.state.visible})}>
                        <div class="btn a-white" id="close-menu">&times;</div>
                    </div>
                </div>
            </div>
        );
    }
}