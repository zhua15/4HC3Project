import React from 'react';
import Button from '@mui/material/Button';
import Popup, { custimizationOptionProps, custimizationOptionsList, customizationType, popupProps } from './PopupPage';
import ItemCard from "../Components/MenuItemCard";
import * as menuItem from './../data/menuData.json';
import Grid from "@mui/material/Grid";
import Cart, { itemProps, optionsProps } from "../Components/Cart";

const customizationOptions: custimizationOptionProps[] = [
    {
        componentType: 'Single',
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
        componentType: 'Multi',
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
    const [openCart, setOpenCart] = React.useState(false);
    const [cart, setCart] = React.useState([]);
    const toggleDrawer = () => () => {
        setOpenCart(!openCart);
    };
    // Need to add this function to onClick of all menu cards and pass the card values to setSelectedItem.
    // Card values should be of type popupProps and each menu card should have these values created

    const handleClickOpen = (n: number) => {
        setOpen(true);
        console.log(menuItem.menuItems[n].customizationOptions)
        const popup: popupProps = {
            open: true,
            setOpen: setOpen,

            name: menuItem.menuItems[n].Name,
            price: menuItem.menuItems[n].Price,
            image: menuItem.menuItems[n].Image,
            rating: menuItem.menuItems[n].Rating,
            ingrediants: menuItem.menuItems[n].Ingrediants,
            calories: menuItem.menuItems[n].Calories,
            customizationOptions: menuItem.menuItems[n].customizationOptions,
            setCart: setCart,
            // customizationOptions: customizationOptions
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

            //TODO: other customization options, now it is always pizza
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
            <Button variant='contained' onClick={toggleDrawer()}>Cart</Button>
            {open ? <Popup {...selectedItem} /> : null}
            <h1>Menu</h1>
            <p>Menu page body content</p>

            {/* this part doesnt work idk why, it should display multiple items on same row */}
            {/* i try grid and row/col they all dont work */}
            <Grid container spacing={2} direction='row'>
                {/* <Grid item md={3}> */}
                {[...Array(itemNum)].map((elementInArray, index) => (
                    <Grid item xs={3}>
                        <ItemCard n={index} handleClick={handleClickOpen} addToCart={addToCart} />
                    </Grid>
                )
                )}

            </Grid>
            <Cart cart={cart} bleeding={0} open={openCart} toggleDrawer={toggleDrawer}/>
        </div >
    );
}

export default page;