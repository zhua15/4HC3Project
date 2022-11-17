import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

export interface cartProps {
    cart: itemProps[],
    bleeding: number,
    open: boolean,
    toggleDrawer: any,
    setHistory: any,
    handleDelete: any
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

                    {props.cart.map((item: itemProps) => {
                        return (
                            <div>
                                <Box textAlign='center'>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        columnGap: '50px',
                                    }}>
                                        <Button onClick={props.handleDelete}>
                                            <DeleteIcon />
                                        </Button>

                                        <Typography
                                            align='center'>
                                            name: {item.name}
                                        </Typography>
                                        <Typography
                                            align='center'>
                                            price: ${item.price}
                                        </Typography>
                                        <Typography
                                            align='center'>
                                            quantity: {item.quantity}
                                        </Typography>
                                    </div>

                                    {item.options ? item.options.map((option: optionsProps) => {
                                        return (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                columnGap: '50px',
                                            }}>
                                                <div />
                                                <div />
                                                <Typography
                                                    align='center'>
                                                    name: {option.name}
                                                </Typography>
                                                <Typography
                                                    align='center'>
                                                    price: ${option.price}
                                                </Typography>
                                            </div>
                                        )
                                    }) : null}
                                </Box>
                            </div>
                        )
                    })}
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
                        <Button variant='contained' onClick={props.setHistory}>
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