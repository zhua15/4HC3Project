import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
 
import Menu from './Pages/MainPage';
import Popup from './Pages/PopupPage';
import Summary from './Pages/SummaryPage';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Menu/>}/>
            <Route path="/popup" element={<Popup/>}/>
            <Route path="/summary" element={<Summary/>}/>
          </Routes>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;