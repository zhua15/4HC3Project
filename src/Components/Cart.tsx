import React from 'react';
import { Button } from '@mui/material';

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
          <h1>food name:</h1>
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