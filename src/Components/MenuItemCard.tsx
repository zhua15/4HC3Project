import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import QuantitySelector from './QuantitySelector';

type Props = {
    item: any;
    handleClick: (item: any) => void;
    addToCart: (item: any, quantity: number) => void,
}

export default function ItemCard(props: Props) {
    const [shadow, setShadow] = React.useState(1);
    const [quantity, setQuantity] = React.useState(1);

    return (
        <Card sx={{ maxWidth: 350, boxShadow: shadow, cursor: "pointer", backgroundColor: "linen" }} onClick={() => props.handleClick(props.item)} onMouseOver={() => setShadow(3)} onMouseOut={() => setShadow(1)}>
            <CardMedia
                component="img"
                height="200"
                image={props.item.Image}
                alt="dish image"
            />
            <CardContent>
                <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                    {props.item.Name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="black">
                    $ {props.item.Price}
                </Typography>
            </CardContent>
            <CardActions>
                {props.item.customizationOptions && props.item.customizationOptions.length > 0 ?
                    <Button sx={{ marginRight: '0', display: 'inline-flex', color: "black" }} size="small" onMouseDown={event => event.stopPropagation()}
                        onClick={event => {
                            event.stopPropagation();
                            event.preventDefault();
                            props.handleClick(props.item);
                        }}><b>Customize</b></Button> :
                    <div style={{ display: 'inline-flex' }}>
                        <div>
                            <QuantitySelector quantity={quantity} setQuantity={setQuantity} popup={false} />
                        </div>
                        &nbsp;
                        &nbsp;
                        <div>
                            <Button sx={{ color: "black" }} size="small" onMouseDown={event => event.stopPropagation()}
                                onClick={event => {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    props.addToCart(props.item, quantity);
                                }}><b>Add To Cart</b></Button>
                        </div>
                    </div>}
            </CardActions>
        </Card >
    );
}