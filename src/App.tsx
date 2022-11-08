import React, { Component } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Menu from './Pages/MainPage';
import Popup, { custimizationOptionProps, custimizationOptionsList, customizationType, popupProps } from './Pages/PopupPage';
import Summary from './Pages/SummaryPage';
import Cart, { cartProps, itemProps, optionsProps } from './Components/Cart'

const cart : cartProps = {cart: [
  {
    name: "pizza",
    price: 10,
    quantity: 2,
    options: [] as optionsProps[]
  } as itemProps,
  {
    name: "cat food",
    price: 100,
    quantity: 30
  } as itemProps
]}

const customizationOptions: custimizationOptionProps[] = [
  {componentType: customizationType.single,
  label: "Select Cheese",
  options: [
    {
      optionName: "Mozerella"
    } as custimizationOptionsList
    ,
    {
      optionName: "Cheddar"
    } as custimizationOptionsList,
  ] as custimizationOptionsList[]
}
]

const popup : popupProps = {
  name: "Pizza",
  price: 8.99,
  image: "./Images/testImage.png",
  rating: 4,
  ingrediants: [
    "Cheese", 
    "Dough", 
    "Tomato Sauce"
  ],
  calories: 500,
  customizationOptions: customizationOptions,
} 
 
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