import React, { Component } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Menu from './Pages/MainPage';
import Popup, { custimizationOptionProps, custimizationOptionsList, customizationType, popupProps } from './Pages/PopupPage';
import Summary from './Pages/SummaryPage';
import Cart, { cartProps, itemProps, optionsProps } from './Components/Cart'

const customizationOptions: custimizationOptionProps[] = [
  {
    componentType: customizationType.Single,
    label: "Select Cheese",
    summaryViewLabel: "Cheese",
    options: [
      {
        optionName: "Mozerella"
      } as custimizationOptionsList
      ,
      {
        optionName: "Cheddar"
      } as custimizationOptionsList,
      {
        optionName: "Special Cheese",
        price: 2.99
      } as custimizationOptionsList
    ] as custimizationOptionsList[]
  },
  {
    componentType: customizationType.Multi,
    label: "Select Toppings",
    summaryViewLabel: "Toppings",
    options: [
      {
        optionName: "Bacon",
        price: 1.99
      } as custimizationOptionsList,
      {
        optionName: "Pepporoni"
      } as custimizationOptionsList,
      {
        optionName: "Mushrooms"
      } as custimizationOptionsList,
      {
        optionName: "Green Peppers"
      } as custimizationOptionsList,
      {
        optionName: "Onions"
      } as custimizationOptionsList,
      {
        optionName: "Yellow Peppers"
      } as custimizationOptionsList
    ]
  }
]

// const popup: popupProps = {
//   setOpen: setSelectedItem,
//   name: "Pizza",
//   price: 8.99,
//   image: "/images/pizza.jpg",
//   rating: 4,
//   ingrediants: [
//     "Cheese",
//     "Dough",
//     "Tomato Sauce"
//   ],
//   calories: 500,
//   customizationOptions: customizationOptions,
// }

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Menu />} />
            {/* <Route path="/popup" element={<Popup {...popup} />} /> */}
            <Route path="/summary" element={<Summary />} />
            {/* <Route path="/cart" element={<Cart {...cart} />} /> */}
          </Routes>
        </div>
      </HashRouter>
    );
  }
}

export default App;