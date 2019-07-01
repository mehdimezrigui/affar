import React from "react";
import { connect } from "react-redux";
import { addUser } from "../action/actionUser";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

const ranges = [
  // {
  //   value: "Manouba",
  //   label: "Manouba"
  // },
  {
    value: "Ariana",
    label: "Ariana"
  },
  {
    value: "Tunis",
    label: "Tunis"
  }
];
const rangesRegion = [
  {
    district: "Tunis",
    list: [
      {
        value: "Bardo",
        label: "Bardo"
      },
      {
        value: "Omran",
        label: "Omran"
      },
      {
        value: "Manzah",
        label: "Manzah"
      }
    ]
  },
  {
    district: "Ariana",
    list: [
      {
        value: "Borj louzir",
        label: "Borj louzir"
      },
      {
        value: "Ennaser",
        label: "Ennaser"
      }
    ]
  }
];
// console.log(rangesRegion.filter(el=>el.district==="Ariana")[0].list.map(el=>el.label))

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 500,
    margin: "auto",
    alignItems: "center"
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    flexBasis: 30,
    width: "100%"
  },
  textArea: {
    height: "100px"
  },
  button: {
    margin: theme.spacing(1),
    padding: "10px 47px 10px 47px",
    marginTop: "8px"
  }
}));

function FormInscription(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    todo: "",
    lastname: "",
    firstname: "",
    email: "",
    phoneNumber: "",
    login: "",
    password: "",
    confirmPassword: "",
    adress: "",
    weightRange: "",
    weight1Range: "",
    cp: "",
    showPassword: false,
    showConfirmPassword: false,
    multiline: ""
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = prop => {
    if (prop == "showPassword")
      setValues({ ...values, showPassword: !values.showPassword });
    else
      setValues({
        ...values,
        showConfirmPassword: !values.showConfirmPassword
      });

    // setValues({ ...values, [prop]: !values.prop });
  };

  const handleSubmit = () => {
    const { password, confirmPassword } = values;
    // perform all neccassary validations
    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      // make API call
    }
  };

  return (
    <div>
      <form className={classes.root}>
        <TextField
          id="outlined-simple-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="First name"
          value={values.firstname}
          onChange={handleChange("firstname")}
        />
        <TextField
          id="outlined-simple-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="Last name"
          value={values.lastname}
          onChange={handleChange("lastname")}
        />
        <TextField
          id="outlined-simple-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="Email address"
          placeholder="name@example.com"
          value={values.email}
          onChange={handleChange("email")}
        />
        <TextField
          id="outlined-simple-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="Phone number"
          value={values.phoneNumber}
          onChange={handleChange("phoneNumber")}
        />
        <TextField
          id="outlined-simple-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="User name"
          value={values.login}
          onChange={handleChange("login")}
        />
        <TextField
          id="outlined-adornment-password"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          type={values.showPassword ? "text" : "password"}
          label="Password"
          value={values.password}
          onChange={handleChange("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="Toggle password visibility"
                  onClick={() => handleClickShowPassword("showPassword")}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          id="outlined-adornment-password"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          type={values.showConfirmPassword ? "text" : "password"}
          label="Confirmation password"
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="Toggle password visibility"
                  onClick={() => handleClickShowPassword("showConfirmPassword")}
                >
                  {values.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Adress"
          multiline
          rowsMax="4"
          value={values.adress}
          onChange={handleChange("adress")}
          className={clsx(classes.textArea, classes.textField)}
          margin="normal"
          variant="outlined"
        />
        <div className="adress-info">
          <TextField
            select
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            label="Ville"
            value={values.weightRange}
            onChange={handleChange("weightRange")}
          >
            {ranges.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            label="Region"
            value={values.weight1Range}
            onChange={handleChange("weight1Range")}
          >
            {values.weightRange &&
              rangesRegion
                .filter(el => el.district === values.weightRange)[0]
                .list.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
          </TextField>

          <TextField
            id="outlined-simple-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            label="Code postal"
            value={values.cp}
            onChange={handleChange("cp")}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={e => {
            props.addUser({
              lastname: values.lastname,
              firstname: values.firstname,
              email: values.email,
              phoneNumber: values.phoneNumber,
              login: values.login,
              password: values.password,
              adress: values.adress,
              weightRange: values.weightRange,
              weight1Range: values.weight1Range,
              cp: values.cp
            });
            handleSubmit();
            setValues({
              ...values,
              lastname: "",
              firstname: "",
              email: "",
              phoneNumber: "",
              login: "",
              password: "",
              confirmPassword: "",
              adress: "",
              weightRange: "",
              weight1Range: "",
              cp: ""
            });
          }}
        >
          Envoyer
        </Button>
      </form>
      {/* <div>
                <h1>Inscription</h1>
                <input type="text" value={this.state.todo} onChange={(e)=>this.setState({todo:e.target.value})}></input>
                <button onClick={(e)=>{this.props.addUser(this.state.todo); this.setState({todo:''})}}>On Click</button>
                <div>
                    {this.props.ListUser.map((el, i) =><h1>{el}</h1>)}
                </div>
            </div> */}
    </div>
  );
}

const mapStateToProps = state => ({
  ListUser: state.ListUser
});

const mapDispatchToProps = dispatch => ({
  addUser: text => {
    dispatch(addUser(text));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormInscription);
