import React, {Component} from "react";
import Container from "../Container";
import MenuButton from "../MenuButton";
import TextBox from "../TextBox";
import './styles.css';

class MenuScreen extends Component {
    render(){
        const subcolumnBtns = (!this.props.actions || this.props.actions.lenght < 1) ? 
            null :
            (
                <div className="start-screen__subcolumn">{
                    this.props.actions.map(
                        item => 
                        <MenuButton key={item.text} text={item.text} onClick={item.action} />)
                }</div>                
            );

            const toolrow = (!this.props.topbar || this.props.topbar.lenght < 1) ? 
            null : this.props.topbar.map(
                        item => 
                        <MenuButton submenu key={item.text} text={item.text} onClick={item.action} />);

        const subcolumnInputs = (!this.props.inputs || this.props.inputs.lenght < 1) ? 
            null :
            (
                <div className="start-screen__subcolumn">{
                    this.props.inputs.map(
                        item => 
                        <TextBox
                            header={item.header}
                            value={item.value}
                            key={item.value + item.header + item.placeholder} 
                            placeholder={item.placeholder} 
                            onChange={item.action} />)
                }</div>                
            );
        
        const title = (!this.props.header) ? null : 
            (<div className="title__container">
                <p className="title__text">
                    {this.props
                        .header
                        .replaceAll('`', '`~`')
                        .split('`')
                        .map((item, index) => {
                            return (item === '~') ? (<br key={index} />) : item;
                        })
                    }
                </p>
            </div>);

        return (
            <div className="start-screen">
                <Container>
                    <div className="start-screen__top-bar">{toolrow}</div>
                    <div className="start-screen__wrapper">
                        { title }
                        { subcolumnInputs } 
                        { subcolumnBtns }
                    </div>
                </Container>
            </div>
        );
    }
}

export default MenuScreen;