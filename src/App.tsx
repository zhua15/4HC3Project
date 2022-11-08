import React, { Component } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
 
import Menu from './Pages/MainPage';
import Popup from './Pages/PopupPage';
import Summary from './Pages/SummaryPage';
import Cart, { cartProps, optionsProps } from './Components/Cart'

const cart : cartProps[] = [
  {
    name: "pizza",
    price: 10,
    quantity: 2,
    options: [] as optionsProps[]
  },
  {
    name: "cat food",
    price: 100,
    quantity: 30
  }
]
 
class App extends Component {
  render() {
    return (      
       <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Menu/>}/>
            <Route path="/popup" element={<Popup/>}/>
            <Route path="/summary" element={<Summary/>}/>
            <Route path="/cart" element={<Cart {...cart}/>}/>
          </Routes>
        </div> 
      </HashRouter>
    );
  }
}
 
export default App;