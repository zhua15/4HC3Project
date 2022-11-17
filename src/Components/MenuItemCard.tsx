import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

type Props = {
    item: any;
    handleClick: (i: number) => void;
    addToCart: (item: any) => void,
}

export default function ItemCard(props: Props) {
    const [shadow, setShadow] = React.useState(1);
    return (
        <Card sx={{ maxWidth: 350, boxShadow: shadow, cursor: "pointer", backgroundColor: "linen" }} onClick={() => props.handleClick(props.item)} onMouseOver={() => setShadow(3)} onMouseOut={() => setShadow(1)}>
            <CardMedia
                component="img"
                height="200"
                image={props.item.Image}
                alt="dish image"
            />
            <CardContent>
                <Typography variant="h6">
                    {props.item.Name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    $ {props.item.Price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onMouseDown={event => event.stopPropagation()}
                    onClick={event => {
                        event.stopPropagation();
                        event.preventDefault();
                        props.addToCart(props.item);
                    }}>Order Now</Button>
            </CardActions>
        </Card >
    );
}