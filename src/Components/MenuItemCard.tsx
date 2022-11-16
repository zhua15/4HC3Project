import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import * as menuItem from './../data/menuData.json';
import Grid from "@material-ui/core/Grid";

type Props = {
    n: number;
    handleClick: (i: number) => void;
    addToCart: (i: number) => void;
}

export default function ItemCard(props: Props) {

    const item = menuItem.menuItems[props.n];
    return (

        <Card sx={{ maxWidth:350 }} style={{ cursor: "pointer"}} onClick={() => props.handleClick(props.n)}>
            <CardMedia
                component="img"
                height="200"
                image={item.Image}
                alt="dish image"
            />
            <CardContent>
                <Typography variant="h6">
                    {item.Name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    $ {item.Price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onMouseDown={event => event.stopPropagation()}
                onClick={event => {
                    event.stopPropagation();
                    event.preventDefault();
                    props.addToCart(props.n)}}>Order Now</Button>
            </CardActions>
        </Card>

    );
}