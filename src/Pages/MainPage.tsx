import React from 'react';
import Button from '@mui/material/Button';
import Popup, { custimizationOptionProps, custimizationOptionsList, customizationType, popupProps } from './PopupPage';
import ItemCard from "../Components/MenuItemCard";
import * as menuItem from './../data/menuData.json';
import Grid from "@material-ui/core/Grid";

import {Row, Col} from "react-bootstrap"
// export interface foodProps {
//     name: string;
//     price: number;
//     quantity: number;
//     image: string;
//     rating: number;
//     ingrediants?: string[];
//     calories: number,
//     customizationOptions?: custimizationOptionProps[];
//  }


const customizationOptions: custimizationOptionProps[] = [
    {
        componentType: customizationType.single,
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
        componentType: customizationType.multi,
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

const page = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState({} as popupProps);

    // Need to add this function to onClick of all menu cards and pass the card values to setSelectedItem.
    // Card values should be of type popupProps and each menu card should have these values created
    const handleClickOpen = (n:number) => {
        setOpen(true);
        const popup: popupProps = {
            open: true,
            setOpen: setOpen,
            name: menuItem.menuItems[n].Name,
            price: menuItem.menuItems[n].Price,
            image: menuItem.menuItems[n].Image,
            rating: menuItem.menuItems[n].Rating,
            ingrediants: menuItem.menuItems[n].Ingrediants,
            calories: menuItem.menuItems[n].Calories,

            // open: true,
            // setOpen: setOpen,
            // name: "Pizza",
            // price: 8.99,
            // image: "/images/pizza.jpg",
            // rating: 4,
            // ingrediants: [
            //     "Cheese",
            //     "Dough",
            //     "Tomato Sauce"
            // ],
            // calories: 500,

            //TODO: other customization options
            customizationOptions: customizationOptions
        }
        setSelectedItem(popup);
    };

    const addToCart = () => {
        // transfer the data
    };
    const itemNum = menuItem.menuItems.length;

    //Button can be removed but need to add an onClick function to all the menu cards, keep the line to render the popup as well
    return (
        <div>
            <Button onClick={() => handleClickOpen(1)}>scroll=paper</Button>
            {open ? <Popup {...selectedItem} /> : null}
            <h1>Menu</h1>
            <p>Menu page body content</p>
            
            

        {/* this part doesnt work idk why, it should display multiple items on same row */}
            <Row md={2} xs={1} className="g-3">
            {/* <Grid> */}
                {/* <Grid item md={3}> */}
            {[...Array(itemNum)].map((elementInArray, index) => (
                <Col key={index}>
                {/* // <Grid item md={3}> */}
                    <ItemCard n={index} handleClick={handleClickOpen} addToCart={addToCart}/>
                </Col>
               
                )
            )}
            
            {/* </Grid> */}
            </Row>
           
        </div>
    );
}

export default page;