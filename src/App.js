import React, {Component} from 'react';
import Playground from './components/Playground';
import MenuScreen from './components/MenuScreen';
import MenuButton from './components/MenuButton';
import WS from './helpers/serverConnect';

import './App.css';

let __nick = localStorage.getItem('nickname');
let __roomCode = "";
let __socet = WebSocket;


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activePage: 0,
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

    this.observ = {
      onmsg: null,
      onimg: null,
      sendMsg: null,
      sendImg: null
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
      (<Playground 
          onBack={() => this.setState({activePage: 0})}
          getRoomCode = { () =>__roomCode }
          observ = {this.observ}
        />),
      (<MenuScreen
        actions={[ 
          {
            text: "JOIN",
            action: () => {
              if(!this.checkStateValid() || !__roomCode){
                return;
              }
              
              __socet.joinRoom(__nick, __roomCode);
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
      // __socet = new WS("ws://localhost:4000");
      __socet = new WS("wss://hotncold-server.herokuapp.com");
      window.t = __socet;
      __socet.onclose = (c) => this.setState({blocked: !c});
      __socet.onconnect = () => this.setState({blocked: false});
      this.observ.sendMsg = (msg) => __socet.sendMsg(__nick, __roomCode, msg);
      __socet.onmsg = (data) => {
        if(data.type === "run-game"){
          __roomCode = data.room;
          this.setState({activePage: 1});
        } else if(data.type === "exit") {
          __roomCode = data.room;
          this.setState({activePage: 0});
        } else if(data.type === "msg") {
            if(typeof this.observ.onmsg === "function"){
              this.observ.onmsg(data);
            }
        }  else if(data.type.onimg === "img") {
          if(typeof this.observ === "function"){
            this.observ.onimg(data);
          }
        }
      }   
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