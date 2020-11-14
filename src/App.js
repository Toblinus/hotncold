import React, {Component} from 'react';
import Playground from './components/Playground';
import StartScreen from './components/StartScreen';
// import WS from './helpers/serverConnect'

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activePage: 1
    }

    window.goToPage = (num) => {
      if(num < 0){
        console.error('Переданный номер не может быть отрицательным');
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
      (<StartScreen />),
      (<Playground />)
    ]
  }

  componentDidMount(){
    // WS.connect();
  }

  render(){
    return this.pages[this.state.activePage] || (<div>Произошла ошибка</div>);
  }
}

export default App;