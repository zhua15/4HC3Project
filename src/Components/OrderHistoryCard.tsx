import React from 'react'
import { order } from '../Pages/SummaryPage';

const OrderHistoryCard = ({name, price, quantity, options}: order) => {
    // console.log(name)
  return (
    <div>
        <p>name:{name} --- price:{price} --- quantity:{quantity} -- options: TODO</p>
    </div>
  )
}

export default OrderHistoryCard