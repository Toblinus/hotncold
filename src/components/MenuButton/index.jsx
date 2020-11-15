import React from "react";
import './styles.css';

function MenuButton(props) {
    return (<button 
        className={"menu-button " + (props.submenu ? "menu-button_sub" : "")} 
        onClick={props.onClick}>
            {props.text}
        </button>);
}

export default MenuButton;