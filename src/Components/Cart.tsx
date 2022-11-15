import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

export interface cartProps {
    cart: itemProps[],
    bleeding: number,
    open: boolean,
    toggleDrawer: any,
}

export interface itemProps {
    name: string;
    price: number;
    quantity: number;
    options?: optionsProps[];
}

export interface optionsProps {
    name: string;
    price?: number;
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
                    height: '100%',
                    overflow: 'auto',
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
                {props.cart.map((item : itemProps) => {
                    return(
                        <Typography
                            align='center'>
                            name: {item.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            price: ${item.price}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            quantity: {item.quantity}
                        </Typography>
                    )
                })}
                <Typography
                    align='center'
                    variant='h6'
                    >
                    Total: ${props.cart.reduce((sum: number, item: itemProps) => 
                    sum + (item.price * item.quantity), 0)}
                </Typography>
                <Box textAlign='center'>
                    <Button variant='contained'>
                        Order
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant='contained'>
                        Pay Bill
                    </Button>
                </Box>
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}

export default cart;