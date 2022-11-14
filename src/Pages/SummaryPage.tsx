import { render } from '@testing-library/react';
import React, { useEffect } from 'react';
import { useState } from 'react'; 
import OrderHistoryCard from '../Components/OrderHistoryCard';


// faking props data 
export interface orderHistoryProps {
   jsonobjects: order[];
}

export interface order {
   name: string;
   price: number;
   quantity: number;
   options?: optionsProps;
}

export interface optionsProps {

}

const fakeProps : order[] = [
   {
      name: "burger",
      price: 8, 
      quantity: 1,
      options: []
   },
   {
      name: "pizza",
      price: 14, 
      quantity: 2,
      options: []
   },
   {
      name: "pasta",
      price: 10, 
      quantity: 5,
      options: []
   },
]




// summary page component
const page = () => {
   const [tip, setTip] = useState(0.13)
   const priceSum = fakeProps.reduce((sum, order) => sum + (order.price * order.quantity), 0)
   const tax = (priceSum * 0.13)
   const totalPrice = priceSum + tax + (priceSum * tip)

    return (
       <div>
          <h1>Summary</h1>
          <h2>Order History</h2>
          {fakeProps.map((order) => {
            return (
               <OrderHistoryCard
                  name={order.name}
                  price={order.price}
                  quantity={order.quantity}
                  options={order.options}
               />
            )
          })}

          <h2>Total Price</h2>
          <p>Price: ${priceSum}</p>
          <p>Tax: ${tax}</p>
          <button onClick={() => setTip(0)}>0%</button>
          <button onClick={() => setTip(0.13)}>13%</button>
          <button onClick={() => setTip(0.20)}>20%</button>
          <p>Tip: ${tip * priceSum} ({tip})</p>
          <p>Total: ${totalPrice}</p>

          <button>Call Service</button>
          <button>Proceed to Payment</button>

       </div>
    );
}
 
export default page;


