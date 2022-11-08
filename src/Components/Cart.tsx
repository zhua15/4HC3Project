import React from 'react';
import { Typography } from '@mui/material';

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
                variant='h1'
                >
                Shopping Cart
            </Typography>
            {props.cart.map((item : itemProps) => {
                return(
                    <Typography>
                        {item.name}
                        {item.price}
                        {item.quantity}
                    </Typography>
                )
            })};
       </div>
    );
}

export default cart;