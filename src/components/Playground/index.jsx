import React, {Component} from "react";
import Container from "../Container";
import MenuButton from "../MenuButton";
import './styles.css';

function HotButton(props) {
    let className = 'hot-button ' + props.text;
    return (
        <div style={{position: "relative"}}>
            {props.active && <Arrow />}
            <div className="hot-button__container">
                <button className={className} onClick={() => props.onClick()}>{props.text}</button>
            </div>
        </div>
        
    )
}

function Arrow() {
    return <div className="arrow"></div>;
}

class Playground extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: -1,
            msgs: []
        }
    }

    addMsg(msg, self = true){
        const msgs = this.state.msgs.slice(0);
        msgs.push({msg: msg, self});
        this.setState({msgs});
    }

    componentDidMount(){
        this.props.observ.onmsg = (data) => {
            this.addMsg(data.msg, false);            
        }

        console.log(this.props.observ);
    }

    componentWillUnmount() {
        this.props.observ.onmsg = null;
    }

    render(){
        const arrayButton = ['FIRE', 'HOT', 'WARM', 'COLD', 'ICE'].map((item, index) => 
                    <HotButton 
                        key={item} 
                        text={item} 
                        active={index === this.state.active} 
                        onClick={() => this.setState({active: index})} />); 

    const msgs = this.state.msgs.map((item, index) => <div 
        className={"message" + (item.self ? " self" : "")} 
        key={index}>{item.msg}
        </div>)

        return (
            <div className="playground">
                <Container>
                    <div className="playground__inner">
                        <div className="top">
                            <MenuButton text="EXIT" submenu onClick={this.props.onBack} />
                            <div className="top__title">Room: {this.props.getRoomCode()}</div>
                        </div>
                        <div className="middle">
                            <div className="left">
                                <div className="left__wrapper">
                                    <div className="messages">
                                            {msgs}
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="buttons">
                                    { arrayButton }
                                </div>
                            </div>                       
                        </div>
                        <div className="bottom">
                            <div className="send">
                                <input type="text" className="send__message" id="inputMsgPlay"></input>
                                <button className="send__button" onClick={() => {
                                    var el = document.getElementById("inputMsgPlay");
                                    this.props.observ.sendMsg(el.value);
                                    this.addMsg(el.value);   
                                    el.value = "";
                                }}/>
                            </div>
                        </div>                   
                    </div>
                </Container>
            </div>


        )
    }
}

export default Playground;