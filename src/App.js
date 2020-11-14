import React, {Component} from 'react';
import Playground from './components/Playground'

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activePage: 1
    }

    this.pages = [
      'sdf',
      (<Playground />)
    ]
  }

  render(){
    return this.pages[this.state.activePage] || (<div>Произошла ошибка</div>);
  }
}

export default App;
