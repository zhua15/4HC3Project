import React from 'react';
import { Button, Typography } from '@mui/material';

export interface cartProps {
    cart: itemProps[]
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

const cart = (props: cartProps) => {
    return (
       <div>
            <Typography
                align='center'
                variant='h2'
                >
                Shopping Cart
            </Typography>
            {props.cart.map((item : itemProps) => {
                return(
                    <Typography>
                        name: {item.name}
                        price: {item.price}
                        quantity: {item.quantity}
                    </Typography>
                )
            })}
            <Typography
                align='center'
                variant='h6'
                >
               Total
            </Typography>
            <Button>
                Order
            </Button>
            <Button>
                Pay Bill
            </Button>
       </div>
    );
}

export default cart;