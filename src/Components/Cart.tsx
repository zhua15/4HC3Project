import React from 'react';
import { Typography } from '@mui/material';

export interface cartProps {
    name: string;
    price: number;
    quantity: number;
    options?: optionsProps[];
}

export interface optionsProps {
    name: string;
    price: number;
}

const cart = (props: cartProps[]) => {
    return (
       <div>
          <Typography
            align='center'
            >
            Shopping Cart
          </Typography>
           <p>{props[0].name}</p>
           <p>{props[0].price}</p>
           <p>{props[0].quantity}</p>
           <p>{props[1].name}</p>
           <p>{props[1].price}</p>
           <p>{props[1].quantity}</p>
       </div>
    );
}

export default cart;