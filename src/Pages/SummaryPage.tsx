import { render } from '@testing-library/react';
import React, { useEffect } from 'react';
import { useState } from 'react'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

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
   const [tip, setTip] = useState(0)
   const priceSum = fakeProps.reduce((sum, order) => sum + (order.price * order.quantity), 0)
   const tax = (priceSum * 0.13)
   const totalPrice = priceSum + tax + (priceSum * tip)

   const createData = (
      name: string,
      calories: number,
      fat: number,
      carbs: number,
      protein: number,
    ) => {
      return { name, calories, fat, carbs, protein };
    }
    
    const rows = [
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    
    const DenseTable = () => {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="a dense table">
            <TableHead>
              <TableRow
              sx={{
               fontWeight: 400
              }}>
                <TableCell><b>Name</b></TableCell>
                <TableCell align="right"><b>Price</b></TableCell>
                <TableCell align="right"><b>Quantity</b></TableCell>
                <TableCell align="right"><b>Options</b></TableCell>
                <TableCell align="right"><b>Total</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fakeProps.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">${row.price}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">TODO</TableCell>
                  <TableCell align="right">${row.price * row.quantity}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    
    
    
    const Subtotal = () => {
       return (
         <TableContainer component={Paper}>
           <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableBody>
               <TableRow>
                 <TableCell rowSpan={3} />
                 <TableCell colSpan={2}>Subtotal</TableCell>
                 <TableCell align="right">${priceSum}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell>Tax</TableCell>
                 <TableCell align="right">{"13%"}</TableCell>
                 <TableCell align="right">${tax}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell>Tip</TableCell>
                 <TableCell align="right">
                  <ButtonGroup variant="outlined">
                        <Button onClick={() => setTip(0)}>0%</Button>
                        <Button onClick={() => setTip(0.13)}>13%</Button>
                        <Button onClick={() => setTip(0.20)}>20%</Button>
                     </ButtonGroup>
                 </TableCell>
                 <TableCell align="right">${tip * priceSum}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell colSpan={2}><b>Total</b></TableCell>
                 <TableCell align="right"><b>${totalPrice.toFixed(2)}</b></TableCell>
               </TableRow>
             </TableBody>
           </Table>
         </TableContainer>
       );
     }


    return (
         <Box mx={10} my={3}>
            <h1>Payment</h1>
            <h2>Order History</h2>
            <DenseTable/>
            
            <h2>Summary</h2>
            <Subtotal/>
         
            <Box my={5} textAlign='right'>
               <Button variant="outlined">Call Service</Button>
               <Button variant="outlined">Proceed to Payment</Button>
            </Box>
         </Box>
    );
}
 
export default page;




