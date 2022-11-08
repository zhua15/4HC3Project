import React from 'react';
import { Button } from '@mui/material';

interface cartProps {
    name: string;
    price: number;
    quantity: number;
    options: optionsProps;
}

interface optionsProps {

}

const props = {
    name: "pizza",
	price: 10,
	quantity: 2,
	options: {}
}

const cart = (props: cartProps) => {
    return (
       <div>
          <h1>Menu</h1>
           <p>Menu page body content</p>
       </div>
    );
}

export default cart;