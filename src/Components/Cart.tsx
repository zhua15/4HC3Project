import React from 'react';
import { Button } from '@mui/material';

export interface cartProps {
    name: string;
    price: number;
    quantity: number;
    options?: [optionsProps];
}

export interface optionsProps {
    name: string;
    price: number;
}

const cart = (props: cartProps) => {
    return (
       <div>
          <h1>food name:</h1>
           <p>{props.name}</p>
           <p>{props.price}</p>
           <p>{props.quantity}</p>
       </div>
    );
}

export default cart;