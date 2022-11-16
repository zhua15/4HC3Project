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

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { custimizationOptionProps, custimizationOptionsList, customizationType } from './PopupPage';
import { Tab } from 'react-bootstrap';

const primaryColor = '#1976d2'


// faking props data 
export interface orderHistoryProps {
   jsonobjects: order[];
}

export interface order {
   name: string;
   price: number;
   quantity: number;
   options?: custimizationOptionProps[];
}


const fakeProps : order[] = [
   {
      name: "burger",
      price: 8, 
      quantity: 1,
   },
   {
      name: "pizza",
      price: 14, 
      quantity: 2,
      options: [
        {
            componentType: 'Single',
            label: "Select Cheese",
            summaryViewLabel: "Cheese",
            options: [
                {
                    optionName: "Mozerella"
                } 
            ] 
        },
        {
            componentType: 'Multi',
            label: "Select Toppings",
            summaryViewLabel: "Toppings",
            options: [
                {
                    optionName: "Bacon",
                    price: 1.99
                },
                {
                    optionName: "Pepporoni",
                },
                {
                    optionName: "Yellow Peppers"
                }
            ]
        }
    ]
   },
   {
      name: "pasta",
      price: 10, 
      quantity: 5,
   },
]


// summary page component
const page = () => {
   const [tip, setTip] = useState(0.1)
  //  const priceSum = fakeProps.reduce((sum, order) => sum + (order.price * order.quantity), 0)
  const getTotalPrice = () => {
    var sum = 0
    fakeProps.map((order) => {
      var itemPrice = 0
      itemPrice += order.price 
      if (order.options) {
        order.options.map((op) => {
          op.options.map((opp) => {
            if (opp.price) itemPrice += opp.price
          })
        })
      }
      itemPrice *= order.quantity
      sum += itemPrice
    })
    return sum
  }

   const priceSum = getTotalPrice()
   const tax = (priceSum * 0.13)
   const totalPrice = priceSum + tax + (priceSum * tip)



    const Row = (props: {row: order}) => {
      const { row } = props;
      const [open, setOpen] = React.useState(false);
      
      const getOptionPrice = (ops: custimizationOptionProps[]) => {
        var optionPrice = 0
        ops.map((op) => {
          op.options.map((opp) => {
            if (opp.price) optionPrice += opp.price
          })
        })
        return optionPrice
      }
        
      const RenderOptions = (props: {op: custimizationOptionProps}) => {
        const {op} = props;
        return (
          <TableBody>
            {op.options.map((opp:custimizationOptionsList) => (
              <TableRow>
                <TableCell align="left">{opp.optionName}</TableCell>
                <TableCell align="right">{opp.price ? '+ $' + opp.price : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        )
      }

      return (
        
        <React.Fragment>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
              { row.options !== undefined ?
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                : <></>
              }
             
            </TableCell>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">${row.price}</TableCell>
            <TableCell align="right">${row.options !== undefined ? getOptionPrice(row.options) : 0}</TableCell>
            <TableCell align="right">{row.quantity}</TableCell>
            <TableCell align="right">${
            row.options !== undefined 
              ? 
                ((row.price + getOptionPrice(row.options) )* row.quantity).toFixed(2)
              :
                (row.price * row.quantity)
            }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box ml="61%" mr={3}>
                  <Table size="small" aria-label="purchases" >
                  <TableRow>
                  </TableRow>
                    {(row.options === undefined) ? <></> :
                     row.options.map((optionRow) => (
                      <RenderOptions op={optionRow}/>
                    ))}
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    }
    
     const CollapsibleTable = () => {
      return (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell><b>Details</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell align="right"><b>Price</b></TableCell>
                <TableCell align="right"><b>Options</b></TableCell>
                <TableCell align="right"><b>Quantity</b></TableCell>
                <TableCell align="right"><b>Total</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fakeProps.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    const Subtotal = () => {
      // const [alignment, setAlignment] = useState(0.1);

      // const selectTip = (tip:number) => {
      //   setAlignment(tip)
      //   setTip(tip)
      // }

      return (
        <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
             <TableBody>
              <TableRow>
                <TableCell>Subtotal</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">${priceSum}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{"13%"}</TableCell>
                <TableCell align="right">${tax.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tip</TableCell>
                <TableCell align="right">
                 {/* <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  // onChange={handleAlignment}
                 >
                  <ToggleButton 
                    value={0} 
                    onClick={() => selectTip(0)}
                  >0%</ToggleButton>
                  <ToggleButton 
                    value={0.1} 
                    onClick={() => selectTip(0.1)}
                  >10%</ToggleButton>
                  <ToggleButton 
                    value={0.2}
                    onClick={() => selectTip(0.2)}
                  >20%</ToggleButton>                  
                 </ToggleButtonGroup> */}
                  <ButtonGroup variant="outlined">
                       <Button onClick={() => setTip(0)}>0%</Button>
                       <Button onClick={() => setTip(0.13)}>13%</Button>
                       <Button onClick={() => setTip(0.20)}>20%</Button>
                    </ButtonGroup>
                </TableCell>
                <TableCell align="right">${(tip * priceSum).toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box textAlign='right' mr={3}>
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
        </Box>
        </>
      );
    }



    return (
         <Box 
          mx={10} 
          my={3} 
          // sx={{color: primaryColor}}
         >
            <h1>Payment</h1>
            <h2>Order History</h2>
            <CollapsibleTable/>
            
            <h2>Summary</h2>
            <Subtotal/>
         
            <Box
              my={5} 
              mx={3}
              sx={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
               <Button variant="contained">Call Service</Button>
               <Button variant="contained">Proceed to Payment</Button>
            </Box>
         </Box>
    );
}
 
export default page;




