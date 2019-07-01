import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const ranges = [
    {
        value: '',
        label: '',
      },
    {
      value: 'Non disponible',
      label: 'Non disponible',
    },
    {
      value: 'Disponible',
      label: 'Disponible',
    }
  ];
  
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 30
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      flexBasis: 60,
      width: 400
     
    },
  }));
export default function Annonce() {
    const classes = useStyles();
  const [values, setValues] = React.useState({
    prix: '',
    description: '',
    titre: '',
    condition: '',
    etatOffre:'',
    image:'',
    phone:'',

  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

    return (
        <div className={classes.root}>
        <TextField
          id="outlined-adornment-weight"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="Titre..."
          value={values.titre}
          onChange={handleChange('titre')}
        />
        <TextField
          id="outlined-adornment-weight"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          multiline={true}
          rows={3}
          rowsMax={5}
          label="Description..."
          value={values.description}
          onChange={handleChange('description')}
        />
        <TextField
          id="outlined-adornment-amount"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="Prix unitaire..."
          value={values.prix}
          onChange={handleChange('prix-unitaire')}
          InputProps={{
            endAdornment: <InputAdornment position="end">TND</InputAdornment>,
          }}
        />
        <TextField
          id="outlined-adornment-weight"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="Etat offre..."
          value={values.etatOffre}
          onChange={handleChange('etatOffre')}
        />
         <TextField
        select
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Condition..."
        value={values.condition}
        onChange={handleChange('condition')}
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      >
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
        
        <TextField
          id="outlined-adornment-weight"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="Image.jpeg..."
          value={values.image}
          onChange={handleChange('image')}
        />
        
      </div>
    )
}
