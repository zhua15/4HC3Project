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
import throttle from "lodash/throttle";

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
        <div style={{ paddingLeft: '2.5%' }}
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

const makeUnique: any = (hash: any, unique: any, i = 1) => {
const uniqueHash = i === 1 ? hash : `${hash}-${i}`;

if (!unique[uniqueHash]) {
    unique[uniqueHash] = true;
    return uniqueHash;
}

return makeUnique(hash, unique, i + 1);
};

const textToHash = (text: String, unique = {}) => {
return makeUnique(
    encodeURI(
    text
        .toLowerCase()
        .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, "")
        // eslint-disable-next-line no-useless-escape
        .replace(/[!@#\$%\^&\*\(\)=_\+\[\]{}`~;:'"\|,\.<>\/\?\s]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
    ),
    unique
);
};

function useThrottledOnScroll(callback: any, delay: any) {
const throttledCallback = React.useMemo(() => throttle(callback, delay), [
    callback,
    delay
]);

React.useEffect(() => {
    window.addEventListener("scroll", throttledCallback);
    return () => {
    window.removeEventListener("scroll", throttledCallback);
    throttledCallback.cancel();
    };
}, [throttledCallback]);
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
            Ingredients: item.Ingredients,
            calories: item.Calories,
            customizationOptions: item.customizationOptions,
            setCart: setCart,
            cart: cart,
        }
        setSelectedItem(popup);
    };

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const addToCart = (item: any, quantity: number) => {
        console.log(cart);
        const tempItem = { name: item.Name, quantity: quantity, price: item.Price } as itemProps;
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
        let tempMains: JSX.Element[] = [];
        let tempSnacks: JSX.Element[] = [];
        let tempDesserts: JSX.Element[] = [];
        let tempDrinks: JSX.Element[] = [];
        menuItem.menuItems.forEach((item) => {
            const itemCard =
                (<Grid item xs={3}>
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

    const [activeState, setActiveState] = React.useState(null);
  const  tabsInScroll  = [{text: "Mains", component: mains}, {text: "Snacks", component: Snacks}, 
  {text: "Desserts", component: desserts}, {text: "Drinks", component: drinks}];

  let itemsServer = tabsInScroll.map((tab) => {
    const hash = textToHash(tab.text);
    return {
      text: tab.text,
      component: tab.component,
      hash: hash,
      node: document.getElementById(hash)
    };
  });

  const itemsClientRef: React.MutableRefObject<any[]> = React.useRef([]);
  React.useEffect(() => {
    itemsClientRef.current = itemsServer;
  }, [itemsServer]);

  const clickedRef = React.useRef(false);
  const unsetClickedRef: React.MutableRefObject<any> = React.useRef(null);
  const findActiveIndex = React.useCallback(() => {
    // set default if activeState is null
    if (activeState === null) setActiveState(itemsServer[0].hash);

    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) return;

    let active;
    for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 0) {
        active = { hash: null };
        break;
      }

      const item = itemsClientRef.current[i];

      if (
        item.node &&
        item.node.offsetTop <
          document.documentElement.scrollTop +
            document.documentElement.clientHeight / 8 +
            48
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState, itemsServer]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166);

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    []
  );

    //Button can be removed but need to add an onClick function to all the menu cards, keep the line to render the popup as well
    return (
        <div style={{ background: 'lightCyan' }}>
            <div>
                <Box
                    borderBottom={1}
                    borderColor='divider'
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-end"
                    style={{ background: 'lightCyan' }}
                    sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: 'lightcyan'
                    }}>
                        <Tabs value={activeState ? activeState : itemsServer[0].hash}>
          {itemsServer.map((item2) => (
            <Tab key={item2.hash} label={item2.text} value={item2.hash} />
          ))}
        </Tabs>
        <div style={{ paddingLeft: "2rem", paddingBottom: "0.5rem" }}>
                        <Button variant='contained' onClick={toggleDrawer()}><ShoppingCart /></Button>
                    </div>
        
                    
                    
                </Box >
                <div>
        {itemsServer.map((item1) => (
          <div id={item1.hash} key={item1.text}>
            <Grid container spacing={2} direction='row'>
                        {item1.component}
                    </Grid>
          </div>
        ))}
      </div>
                {open ? <Popup {...selectedItem} /> : null}
                <Cart cart={cart} setCart={setCart} bleeding={0} open={openCart} toggleDrawer={toggleDrawer} setHistory={setOrderHistory} />
            </div >
        </div>
    );
}

export default page;