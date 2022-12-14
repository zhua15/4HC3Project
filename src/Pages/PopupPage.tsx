import React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { itemProps, optionsProps } from '../Components/Cart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Rating from '@mui/material/Rating';
import QuantitySelector from '../Components/QuantitySelector';

const primaryColor = '#1976d2'

export interface popupProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCart: any
  cart: any,
  name: string;
  price: number;
  image: string;
  rating: number;
  Ingredients?: string[];
  calories: number;
  customizationOptions?: custimizationOptionProps[];
}

export interface custimizationOptionProps {
  componentType: string;  //USE "Single" or "Multi" in json data file
  label: string;
  summaryViewLabel: string;
  options: custimizationOptionsList[]
}

export enum customizationType {
  Single = "Single",
  Multi = "Multi"
}

export interface custimizationOptionsList {
  optionName: string,
  price?: number
}

interface options {
  subheaderlist: []
}

interface subheader {
  subheadername: string;
  subheaderelements: string[];
}

const page = (props: popupProps) => {
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('body');
  const [values, setValues] = React.useState({} as any);
  const [IngredientsTableRows, setIngredientsTableRows] = React.useState([] as JSX.Element[]);
  const [openTable, setOpenTable] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);

  const options: JSX.Element[] = [];

  const handleRadioChange = (label: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(
      {
        ...values,
        [label]: (event.target as HTMLInputElement).value
      }
    );
  };

  const handleCheckboxChange = (label: string, price: number = 0, event: React.ChangeEvent<HTMLInputElement>) => {
    let tempValues: custimizationOptionsList[] = []
    if ((values as any)[label]) {
      tempValues = (values as any)[label];
    } else {
      tempValues = [];
    }
    if (event.target.checked) {
      if (price !== 0) {
        tempValues.push({ optionName: (event.target as HTMLInputElement).name, price: price });
      } else {
        tempValues.push({ optionName: (event.target as HTMLInputElement).name });
      }
    } else {
      const newValues: custimizationOptionsList[] = [];
      tempValues.forEach((value) => {
        if (value.optionName !== (event.target as HTMLInputElement).name) {
          newValues.push(value);
        }
      })
      tempValues = newValues;
    }
    setValues(
      {
        ...values,
        [label]: tempValues,
      }
    );
  };

  if (props.customizationOptions) {
    props.customizationOptions.forEach((option) => {
      if (option.componentType === 'Single') {
        const listOptions: JSX.Element[] = [];
        option.options.forEach((listOption) => {
          let label: JSX.Element = <label>{listOption.optionName}</label>;
          let value: string = listOption.optionName;
          if (listOption.price) {
            label = <label>{listOption.optionName} <label style={{ marginLeft: '2rem' }}>+${listOption.price}</label></label>;
            value = `${listOption.optionName}--${listOption.price}`
          }
          listOptions.push(
            <FormControlLabel value={value} control={< Radio />} label={label} key={listOption.optionName} />
          );
        });
        let defaultValue: string = option.options[0].optionName;
        if (option.options[0].price) {
          defaultValue = `${option.options[0].optionName}--${option.options[0].price}`
        }
        options.push(
          <FormControl
            key={option.label}
            sx={{
              marginBottom: '2rem',
            }}
          >
            <FormLabel sx={{ color: primaryColor }} id="radio-buttons-group-label">{<b>{option.label}</b>}</FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue={defaultValue}
              onChange={(e) => handleRadioChange(option.summaryViewLabel, e)}
              value={(values as any)[option.label]}
            >
              {listOptions}
            </RadioGroup>
          </FormControl>
        );
        options.push(<br></br>);
      } else if (option.componentType === 'Multi') {
        const listOptions: JSX.Element[] = [];
        option.options.forEach((listOption) => {
          let label: JSX.Element = <label>{listOption.optionName}</label>;
          if (listOption.price) {
            label = <label>{listOption.optionName} <label style={{ marginLeft: '2rem' }}>+${listOption.price}</label></label>;
          }
          listOptions.push(
            <FormControlLabel control={<Checkbox name={listOption.optionName} onChange={(e) => handleCheckboxChange(option.summaryViewLabel, listOption.price, e)} />} label={label} key={listOption.optionName} />
          );
        });
        options.push(
          <FormControl
            key={option.label}
            sx={{
              marginBottom: '2rem',
            }}
          >
            <FormLabel sx={{ color: primaryColor }} id="radio-buttons-group-label">{<b>{option.label}</b>}</FormLabel>
            <FormGroup>
              {listOptions}
            </FormGroup>
          </FormControl >
        );
        options.push(<br></br>);
      }
    });
  }
  options.push(
    <div>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} popup={true} />
    </div>
  );

  const handleClose = () => {
    props.setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }

      if (props.customizationOptions) {
        props.customizationOptions.forEach((option) => {
          if (option.componentType == 'Single') {
            let defaultValue: string = option.options[0].optionName;
            if (option.options[0].price) {
              defaultValue = `${option.options[0].optionName}--${option.options[0].price}`
            }
            setValues(
              {
                ...values,
                [option.summaryViewLabel]: defaultValue,
              }
            );
          }
        })
      }
    }
  }, [props.open]);

  const title = (
    <div>
      <label style={{ color: primaryColor, fontSize: "2rem", fontStyle: "bold" }}>
        {props.name}
      </label>
      <div>
        <Rating name="read-only" value={props.rating} readOnly />
      </div>
      <div style={{ display: 'inline-flex' }}>
        <label>
          {`$${props.price} `}
        </label>
      </div>
      <div style={{ display: 'inline-flex', paddingLeft: '65%' }}>
        <label>
          {`${props.calories} calories`}
        </label>
      </div>
    </div >
  );

  const handleSubmit = () => {
    const tempItem = { name: props.name, quantity: quantity, price: props.price } as itemProps;
    const tempData = [] as optionsProps[];
    for (const key in values) {
      console.log(values[key]);
      if (Array.isArray(values[key])) {
        console.log(values[key]);
        values[key].forEach((value: any) => {
          tempData.push({ name: value.optionName, price: value.price ? value.price : 0 });
        });
      } else {
        const tempName = values[key].split('--')[0]
        let tempPrice = values[key].split('--')[1]
        tempData.push({ name: tempName, price: parseInt(tempPrice ? tempPrice : '0') });
      }
    }
    tempItem.options = tempData;
    console.log(tempItem);
    props.setCart([...props.cart, tempItem]);
    handleClose();
  }
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={props.open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <Box
          component="img"
          sx={{
            height: '22rem',
            width: '100%',
          }}
          alt={props.name}
          src={props.image}
        />
        <DialogContent dividers={scroll === 'paper'}>
          {props.Ingredients && props.Ingredients.length > 0 ?
            <TableContainer sx={{ marginTop: '2vh', marginBottom: '5vh' }} component={Paper}>
              <Table sx={{}} aria-label="cart table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenTable(!openTable)}
                      >
                        {openTable ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton><label style={{ color: primaryColor }}><b>Ingredients</b></label></TableCell>
                  </TableRow>
                </TableHead>
                <Collapse in={openTable} timeout="auto" unmountOnExit>
                  <TableBody>
                    {props.Ingredients.map((item) => (
                      <TableRow key={item}>
                        <TableCell sx={{ width: '100vw' }}>
                          {item}
                        </TableCell>
                      </TableRow>))}
                  </TableBody>
                </Collapse>
              </Table>
            </TableContainer> : null}
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {options}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add to Cart</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}

export default page;