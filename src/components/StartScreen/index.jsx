import React, {Component} from "react";
import './styles.css';

class Button extends Component {
    render() {
        return (
            <a className="start-screen__button" >{this.props.text}</a>
        )
    }
}

class Title extends Component {
    render() {
        return (
            <div className="title__container">
                <p className="title__text">HOT<br/>'N'<br/>COLD<br/></p>
            </div>

        )
    }
}

class Form extends Component {
    render() {
        return (
            <form action="" className="form">
                <label htmlFor="nick">Your nickname</label>
                <input id="nick" type="text" placeholder="............."/>
            </form>
        )
    }
}

class StartScreen extends Component {
    render(){
        return (
            <div className="start-screen">
                <div className="container">
                    <div className="screen">
                        <Title/>
                        <Form/>
                        <Button text="START"/>
                        <Button text="OPTIONS"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default StartScreen;