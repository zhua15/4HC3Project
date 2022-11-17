import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
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

export interface cartProps {
    cart: itemProps[],
    setCart: any,
    bleeding: number,
    open: boolean,
    toggleDrawer: any,
    setHistory: any,
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

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'dark' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : grey[500],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'dark' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const cart = (props: cartProps) => {

    let navigate = useNavigate();
    const routeChange = () => {
        props.setHistory()
        let path = `/summary`;
        navigate(path);
    }
    
    const order = () => {
        props.setHistory()
        props.setCart([])
    }

    const handleDelete = (item: itemProps) => {
        var index = props.cart.indexOf(item);
        if (index !== -1) {
            var temp = props.cart
            temp.splice(index, 1)
            console.log(temp)
            props.setCart([...temp])
        }
    }

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
                { item.options && item.options.length > 0 ?
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

    const CollapsibleTable = () => {
        return (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="cart table">
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
                {props.cart.map((item) => ( <Row key={item.name} item={item} /> ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${props.bleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={props.open}
                onClose={props.toggleDrawer()}
                onOpen={props.toggleDrawer()}
                swipeAreaWidth={props.bleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '40%',
                    }}
                >
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Typography
                        align='center'
                        variant='h2'
                    >
                        Shopping Cart
                    </Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <CollapsibleTable/>
                    <Typography
                        align='center'
                        variant='h6'
                    >
                        Total: ${(props.cart.reduce((sum: number, item: itemProps) =>
                            sum + (item.quantity * (item.price + (
                                item.options ? (
                                    item.options.reduce((optionSum: number, optionItem) => optionSum + optionItem.price, 0)
                                ) as number : 0
                            ))), 0)).toFixed(2)}
                    </Typography>
                    <Box textAlign='center'>
                        <Button variant='contained' onClick={order}>
                            Order
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant='contained' onClick={routeChange}>
                            Order and Pay
                        </Button>
                    </Box>
                </StyledBox >
            </SwipeableDrawer >
        </Root >
    );
}

export default cart;