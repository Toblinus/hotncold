import React, {Component} from 'react';
import Playground from './components/Playground';
import MenuScreen from './components/MenuScreen';
import MenuButton from './components/MenuButton';
import WS from './helpers/serverConnect';

import './App.css';

let __nick = localStorage.getItem('nickname');
let __roomCode = localStorage.getItem('room-code');
let __socet = WebSocket;


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activePage: 1,
      blocked: false
    }

    window.goToPage = (num) => {
      if(num < 0){
        console.error('Переданный номер не может   быть отрицательным');
        return;
      }

      console.log(this.pages.length - 1);
      if(num >= this.pages.length){
        console.error('Переданный номер не может быть больше ' + (this.pages.length - 1).toString());
        return;
      }

      this.setState({activePage: num});
    }

    this.pages = [
      (<MenuScreen 
        actions={[
            {
              text: "CREATE",
              action: () => {
                if(!this.checkStateValid()){
                  return;
                }

                localStorage.setItem('nickname', __nick);

                __socet.createRoom();
              } 
            }, 
            {
              text: "JOIN",
              action: () => {
                if(!this.checkStateValid()){
                  return;
                }

                localStorage.setItem('nickname', __nick);

                this.setState({activePage: 2});
              } 
            }
          ]} 
        header="HOT`'N'`COLD"
        inputs={[
          {
            placeholder: "Your nickname",
            value: __nick, 
            action: (event) => {
              __nick = event.target.value;
            }
          }]} />
      ),
      (<Playground onBack={() => this.setState({activePage: 0})} />),
      (<MenuScreen
        actions={[ 
          {
            text: "JOIN",
            action: () => {
              if(!this.checkStateValid()){
                return;
              }

              this.setState({activePage: 1});
            } 
          }
        ]}
        topbar={[
          {
            text: "BACK",
            action: () => {
              this.setState({activePage: 0});
            }
          }
        ]}  
        inputs={[
          {
            placeholder: "Room code",
            value: __roomCode, 
            action: (event) => {
              __roomCode = event.target.value;
            }
          }]}
      />)
    ]
  }

  checkStateValid(){
    return __nick && __socet.readyState === __socet.OPEN;
  }

  componentDidMount(){
    try {
      __socet = new WS("ws://192.168.0.85:4000");
      window.t = __socet;
      __socet.onclose = (c) => this.setState({blocked: !c});
      __socet.onconnect = () => this.setState({blocked: false});   
    } catch {
      this.setState({blocked: true});
    }
     
  }

  render(){
    return (<div>
      {this.state.blocked && 
      <div className="blocked-screen">
        <div className="blocked-screen__modal">
            <div>Ошибка соединения</div>
            <MenuButton 
              text="Обновить" 
              submenu={true} 
              onClick={ () => {
                  this.setState({blocked: false});
                  this.componentDidMount(); 
                }
              } />
        </div>
      </div>}
      { this.pages[this.state.activePage] || 
      (<div>Произошла ошибка</div>) }
    </div>)
  }
}

export default App;