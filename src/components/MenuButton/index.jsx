import React from "react";
import './styles.css';

function MenuButton(props) {
    return (<button 
        className="menu-button" 
        onClick={props.onClick}>
            {props.text}
        </button>);
}

export default MenuButton;