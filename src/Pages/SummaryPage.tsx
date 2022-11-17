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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from "react-router-dom";


import { itemProps, optionsProps } from "../Components/Cart";



// summary page component
const summary = (props: {orderHistoryProps: itemProps[]}) => {
  console.log(props)
   const [tip, setTip] = useState(0)

  // calculates subtotal 
  const getSubtotalPrice = () => {
    var sum = 0
    props.orderHistoryProps.map((order) => {
      var itemPrice = 0
      itemPrice += order.price 
      if (order.options) {
        order.options.map((option) => { itemPrice += option.price })
      }
      itemPrice *= order.quantity
      sum += itemPrice
    })
    return sum
  }
   const subtotal = getSubtotalPrice()

   const tax = (subtotal * 0.13)
   const totalPrice = subtotal + tax + (subtotal * tip)

  // for back button
   let navigate = useNavigate(); 
   const navigateToMainPage = () => {
      let path = `/`
      navigate(path)
   }


    // creates each row (collapsible) of the CollapsibleTable component
    const Row = (props: {item: itemProps}) => {
      const { item } = props;
      const [open, setOpen] = React.useState(false);
      
      const getOptionsubtotal = (item: itemProps) => {
        var optionPrice = 0
        if (item.options) {
          item.options.map((option) => {
            optionPrice += option.price
          })
        }
        return optionPrice
      }   

      return (
        <React.Fragment>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
              { item.options !== undefined ?
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
            <TableCell component="th" scope="row">{item.name}</TableCell>
            <TableCell align="right">${item.price}</TableCell>
            <TableCell align="right">
              {(item.options && getOptionsubtotal(item) > 0)
                ? "$" + getOptionsubtotal(item) 
                : ""}
            </TableCell>
            <TableCell align="right">{item.quantity}</TableCell>
            <TableCell align="right">${
            item.options !== undefined 
              ? ((item.price + getOptionsubtotal(item) )* item.quantity).toFixed(2)
              : (item.price * item.quantity)
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
                    {(item.options === undefined) 
                      ? <></> 
                      : // render each option name and price in condensed table
                      <TableBody>
                        {item.options &&
                        item.options.map((option:optionsProps) => (
                          <TableRow>
                            <TableCell align="left">{option.name}</TableCell>
                            <TableCell align="right">
                              {option.price == 0 ? '' : '+ $' + option.price}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    }
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    }
    
    // parent table
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
              {props.orderHistoryProps.map((item) => ( <Row key={item.name} item={item} /> ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    // table that displays subtotal, tax and tip 
    const Subtotal = () => {
      return (
        <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
             <TableBody>
              <TableRow>
                <TableCell>Subtotal</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">${subtotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{"13%"}</TableCell>
                <TableCell align="right">${tax.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tip</TableCell>
                <TableCell align="right">
                  <ButtonGroup variant="outlined">
                       <Button 
                        onClick={() => setTip(0)}
                        color={tip === 0 ? "secondary" : "primary"}
                       > 
                        0%
                       </Button>
                       <Button 
                        onClick={() => setTip(0.1)}
                        color={tip === 0.1 ? "secondary" : "primary"}
                       >
                        10%
                       </Button>

                       <Button 
                        onClick={() => setTip(0.2)}
                        color={tip === 0.2 ? "secondary" : "primary"}
                       >
                        20%
                       </Button>
                    </ButtonGroup>
                </TableCell>
                <TableCell align="right">${(tip * subtotal).toFixed(2)}</TableCell>
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


    // main 
    return (
         <Box 
          mx={10} 
          my={3} 
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
               <Button 
                variant="contained"
                onClick={navigateToMainPage}
               >Back</Button>
               <Button variant="contained">Proceed to Payment</Button>
            </Box>
         </Box>
    );
}
 
export default summary;




