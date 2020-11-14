import React, {Component} from "react";
import './styles.css';

class Exit extends Component {
    render() {
        return (
            <a className="exit-button">Exit</a>
        )
    }
}

class MessageField extends Component {
    render() {
        return (
            <input type="text" className="send__message"></input>
        )
    }
}

class SendButton extends Component {
    render() {
        return (
            <button className="send__button"><span className="send__icon"></span></button>
        )
    }

}

class Message extends Component {
    render() {
        return (
            <span className="message">Толян</span>
        )
    }
}

class HotButton extends Component {
    render() {
        let className = 'hot-button ' + this.props.text;
        return (
            <div className="hot-button__container">
                <button className={className}>{this.props.text}</button>
            </div>
        )
    }
}

class Arrow extends Component {
    render() {
        return (
            <div className="arrow"></div>
        )
    }
}

class Playground extends Component {
    render(){
        return (
            <div className="playground">
                <div className="container">
                    <div className="playground__inner">
                        <div className="exit"><Exit/></div>
                        <div className="messages">
                            <div className="messages__inner">
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                            </div>

                        </div>
                        <div className="buttons">
                            <Arrow/>
                            <HotButton text="FIRE"/>
                            <HotButton text="HOT"/>
                            <HotButton text="WARM"/>
                            <HotButton text="COLD"/>
                            <HotButton text="ICE"/>
                        </div>
                        <div className="send">
                            <MessageField/>
                            <SendButton/>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}



export default Playground;