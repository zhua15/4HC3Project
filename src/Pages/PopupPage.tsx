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
import FormControl, { formControlClasses } from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { itemProps, optionsProps } from '../Components/Cart';

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
  ingrediants?: string[];
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
    })
  }

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

  const title = <div><label style={{ color: primaryColor, fontSize: "2rem", fontStyle: "bold" }}>{props.name}</label><br></br><label>{`$${props.price} `}</label></div>;

  const handleSubmit = () => {
    const tempItem = { name: props.name, quantity: 1, price: props.price } as itemProps;
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
            height: '20rem',
            width: '100%',
          }}
          alt={props.name}
          src={props.image}
        />
        <DialogContent dividers={scroll === 'paper'}>
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
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default page;