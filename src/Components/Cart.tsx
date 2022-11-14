import React from 'react';
import { Button, SwipeableDrawer, Typography } from '@mui/material';
import { Box } from '@mui/system';

export interface cartProps {
    cart: itemProps[],
    container: any,
    bleeding: number
}

export interface itemProps {
    name: string;
    price: number;
    quantity: number;
    options?: optionsProps[];
}

export interface optionsProps {
    name: string;
    price: number;
}

const [open, setOpen] = React.useState(false);

const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
};

const container = window !== undefined ? () => window().document.body : undefined;

const cart = (props: cartProps) => {
    return (
        <SwipeableDrawer
        container={props.container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={props.bleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
            <Typography
                align='center'
                variant='h2'
                >
                Shopping Cart
            </Typography>
            {props.cart.map((item : itemProps) => {
                return(
                    <Typography
                        align='center'>
                        name: {item.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        price: ${item.price}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        quantity: {item.quantity}
                    </Typography>
                )
            })}
            <Typography
                align='center'
                variant='h6'
                >
                Total: {props.cart.reduce((sum: number, item: itemProps) => 
                sum + (item.price * item.quantity), 0)}
            </Typography>
            <Box textAlign='center'>
                <Button variant='contained'>
                    Order
                </Button>
            </Box>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <Box textAlign='center'>
                <Button variant='contained'>
                    Pay Bill
                </Button>
            </Box>
       </SwipeableDrawer>
    );
}

export default cart;