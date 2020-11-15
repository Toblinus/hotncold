import React from "react";
import './styles.css';

function TextBox(props) {
    return (<div className="text-box">
        {props.header && (<div className="text-box__header">
            {props.header}
        </div>)}
        <input
        type="text"
        placeholder={props.placeholder} 
        className="text-box__input" 
        onChange={props.onChange}
        value={props.value} />
    </div>);
}

export default TextBox;