import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Popup, { custimizationOptionProps, custimizationOptionsList, customizationType, popupProps } from './PopupPage';
import ItemCard from "../Components/MenuItemCard";
import * as menuItem from './../data/menuData.json';
import Grid from "@mui/material/Grid";
import Cart, { itemProps, optionsProps } from "../Components/Cart";
import { Box, height } from '@mui/system';
import Typography from '@mui/material/Typography';
import { ShoppingCart } from '@mui/icons-material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

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

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }} >
                    <Typography>{children}</Typography>
                </Box>
            )
            }
        </div >
    );
}

const page = (props: { orderHistoryProps: itemProps[] }) => {
    // const { orderHistory, setOrderHistory } = props;

    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState({} as popupProps);
    const [openCart, setOpenCart] = React.useState(false);
    const [cart, setCart] = React.useState([] as itemProps[]);
    const [mains, setMains] = React.useState([] as JSX.Element[]);
    const [Snacks, setSnacks] = React.useState([] as JSX.Element[]);
    const [desserts, setDesserts] = React.useState([] as JSX.Element[]);
    const [drinks, setDrinks] = React.useState([] as JSX.Element[]);

    useEffect(() => { document.body.style.backgroundColor = 'lightcyan' }, [])

    const toggleDrawer = () => () => {
        setOpenCart(!openCart);
    };

    // Need to add this function to onClick of all menu cards and pass the card values to setSelectedItem.
    // Card values should be of type popupProps and each menu card should have these values created
    const handleClickOpen = (item: any) => {
        setOpen(true);
        const popup: popupProps = {
            open: true,
            setOpen: setOpen,

            name: item.Name,
            price: item.Price,
            image: item.Image,
            rating: item.Rating,
            ingrediants: item.Ingrediants,
            calories: item.Calories,
            customizationOptions: item.customizationOptions,
            setCart: setCart,
            cart: cart,

        }
        setSelectedItem(popup);
    };

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const addToCart = (item: any) => {
        console.log(cart);
        const tempItem = { name: item.Name, quantity: 1, price: item.Price } as itemProps;
        console.log([...cart, tempItem]);
        setCart([...cart, tempItem]);
    }

    useEffect(() => {
        console.log(cart);
    }, [cart])

    const setOrderHistory = () => {
        console.log("cart", cart)
        cart.map((item) => {
            props.orderHistoryProps.push(item)
        })
        // props.orderHistoryProps.extend(...cart)
    }


    const itemNum = menuItem.menuItems.length;

    useEffect(() => {
        console.log(menuItem.menuItems);
        let tempMains: JSX.Element[] = [];
        let tempSnacks: JSX.Element[] = [];
        let tempDesserts: JSX.Element[] = [];
        let tempDrinks: JSX.Element[] = [];
        menuItem.menuItems.forEach((item) => {
            const itemCard =
                (<Grid item xs={4}>
                    <ItemCard item={item} handleClick={handleClickOpen} addToCart={addToCart} />
                </Grid>)
            if (item.Tab === "Mains") {
                tempMains.push(itemCard);
            } else if (item.Tab === "Snacks") {
                tempSnacks.push(itemCard);
            } else if (item.Tab === "Desserts") {
                tempDesserts.push(itemCard);
            } else if (item.Tab === "Drinks") {
                tempDrinks.push(itemCard);
            }
        })
        setMains(tempMains);
        setSnacks(tempSnacks);
        setDesserts(tempDesserts);
        setDrinks(tempDrinks);
    }, [cart]);

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    //Button can be removed but need to add an onClick function to all the menu cards, keep the line to render the popup as well
    return (
        <div style={{ background: 'lightCyan' }}>
            <div>
                <Box
                    m={1}
                    borderBottom={1}
                    borderColor='divider'
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-end">
                    <div>
                        <Tabs value={value} onChange={handleChangeTabs} aria-label="basic tabs">
                            <Tab label="Mains" {...a11yProps(0)} />
                            <Tab label="Snacks" {...a11yProps(1)} />
                            <Tab label="Desserts" {...a11yProps(2)} />
                            <Tab label="Drinks" {...a11yProps(3)} />
                        </Tabs>
                    </div>
                    <div style={{ paddingLeft: "2rem", paddingBottom: "0.5rem" }}>
                        <Button variant='contained' onClick={toggleDrawer()}><ShoppingCart /></Button>
                    </div>
                </Box >
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2} direction='row'>
                        {mains}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container spacing={2} direction='row'>
                        {Snacks}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grid container spacing={2} direction='row'>
                        {desserts}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Grid container spacing={2} direction='row'>
                        {drinks}
                    </Grid>
                </TabPanel>
                {open ? <Popup {...selectedItem} /> : null}
                <Cart cart={cart} setCart={setCart} bleeding={0} open={openCart} toggleDrawer={toggleDrawer} setHistory={setOrderHistory}/>
            </div >
        </div>
    );
}

export default page;