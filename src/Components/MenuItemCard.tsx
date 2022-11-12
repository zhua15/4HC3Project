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
    handleClick: (i:number) => void;
    addToCart: (i:number) => void;

}

export default function ItemCard(props: Props) {

    const item = menuItem.menuItems[props.n];
    console.log(item)
    return (

        <Card sx={{ maxWidth: 275 }}>
            <CardMedia
                component="img"
                height="150"
                image={item.Image}
                alt="dish image"
            />
            <CardContent>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Rate: {item.Rating}
                </Typography> */}
                <Typography variant="h5">
                    {item.Name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    $ {item.Price}
                </Typography>
                {/* <Typography variant="body2">
                    {item.Ingrediants.toString()}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.Calories} kcal
                </Typography> */}
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>props.handleClick(props.n)}>See Details</Button>
                <Button size="small" onClick={()=>props.addToCart(props.n)}>Order Now</Button>

            </CardActions>
        </Card>
       
    );
}