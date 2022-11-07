import React, { Component } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
 
import Menu from './Pages/MainPage';
import Popup from './Pages/PopupPage';
import Summary from './Pages/SummaryPage';
 
class App extends Component {
  render() {
    return (      
       <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Menu/>}/>
            <Route path="/popup" element={<Popup/>}/>
            <Route path="/summary" element={<Summary/>}/>
          </Routes>
        </div> 
      </HashRouter>
    );
  }
}
 
export default App;