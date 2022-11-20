import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export interface quantitySelectorProps {
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>,
  popup: boolean,
}

const QuantitySelector = (props: quantitySelectorProps) => {
  const handlePlus = () => {
    if (props.quantity < 99) {
      props.setQuantity(props.quantity + 1);
    }
  }

  const handleMinus = () => {
    if (props.quantity > 1) {
      props.setQuantity(props.quantity - 1);
    }
  }

  if (props.popup) {
    return (
      <div onClick={(e) => { }} style={{ paddingLeft: '30%' }}>
        <div style={{ display: 'inline-flex', paddingRight: '10%' }}>
          <IconButton aria-label="expand row"
            size="small"
            onClick={() => handleMinus()}>
            <RemoveIcon sx={{ color: 'red', fontSize: 50 }} />
          </IconButton>
        </div>
        <div style={{ display: 'inline-flex', paddingRight: '10%' }}>
          <label style={{ fontSize: 50 }}>
            {props.quantity}
          </label>
        </div>
        <div style={{ display: 'inline-flex' }}>
          <IconButton aria-label="expand row"
            size="small"
            onClick={() => handlePlus()}>
            <AddIcon sx={{ color: 'green', fontSize: 50 }} />
          </IconButton>
        </div>
      </div >
    );
  }
  return (
    <div onClick={(event) => {
      event.stopPropagation();
      event.preventDefault();
    }} style={{ display: 'inline-flex' }}>
      <div style={{ display: 'inline-flex', paddingRight: '10%' }}>
        <IconButton aria-label="expand row"
          size="small"
          onClick={() => handleMinus()}>
          <RemoveIcon sx={{ color: 'red', fontSize: 25 }} />
        </IconButton>
      </div>
      <div style={{ display: 'inline-flex', paddingRight: '10%' }}>
        <label style={{ fontSize: 25 }}>
          {props.quantity}
        </label>
      </div>
      <div style={{ display: 'inline-flex' }}>
        <IconButton aria-label="expand row"
          size="small"
          onClick={() => handlePlus()}>
          <AddIcon sx={{ color: 'green', fontSize: 25 }} />
        </IconButton>
      </div>
    </div >
  );
}

export default QuantitySelector;
