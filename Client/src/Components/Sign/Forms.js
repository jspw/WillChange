import React, { useState, useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import "./SignIn.css";

const TextForm = (props) => (
  <FormControl className={props.classes.margin} variant="outlined">
    <InputLabel>{props.label}</InputLabel>
    <OutlinedInput
      id={props.id}
      onChange={props.handleChange(props.id)}
      value={props.values}
      labelWidth={props.labelWidth}
    />
  </FormControl>
);

const PasswordForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl className={props.classes.margin} variant="outlined">
      <InputLabel>{props.label}</InputLabel>
      <OutlinedInput
        id={props.id}
        type={showPassword ? "text" : "password"}
        value={props.values}
        onChange={props.handleChange(props.id)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={"password"}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={props.labelWidth}
      />
    </FormControl>
  );
};

const SelectForm = props => {

    let items;
    const id = props.id;

    const[universities, setUniversities] = useState(null);

    useEffect(() => {
      // POST request using fetch inside useEffect React hook
      const requestOptions = {
        method: "GET",
      };
      fetch("http://19bd18c73cba.ngrok.io/university/all", requestOptions)
        .then((response) => response.json())
        .then((data) => setUniversities(data.result.data.universities));

      // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    console.log(universities);

    if(id === "role") items = ['Teacher', 'Student'];
    else if(id === "university") {
        items = ['SUST', 'DU', 'BUET'];
    }
    else if(id === "department") {
        items = ['SWE', 'CSE', 'EEE'];
    }
    else if(id === "session") {
        items = ['2016-2017','2017-2018', '2018-2019', '2020-2021'];
    }
    else if(id === "designation") {
        items = ['Professor', 'Assistant Professor', 'Lecturer'];
    }

    const menuItems = items.map((item, i) => {
        return (
            <MenuItem key={i} value={item.toLocaleLowerCase()}>{item}</MenuItem>
        )
    });

/*     const menu = universities.map((item, i) => {
        return (
            <MenuItem key={i} value={item[i]._id}>{item[i].shortform}</MenuItem>
        )
    }); */
    // console.log(menu);

    return (
      <FormControl variant="outlined" className={props.classes.textField}>
        <InputLabel>{props.label}</InputLabel>
        <Select
          id={id}
          value={props.values}
          onChange={props.handleChange(id)}
          label={props.label}
        >
          <MenuItem disabled>
            <em>{props.label}</em>
          </MenuItem>
          {menuItems}
        </Select>
      </FormControl>
    );
} 

const Forms = (props) => {
    const type = props.type;
    if (type === "text") {
      return (
        <TextForm {...props}/>
      );
    } else if (type === "password") {
      return (
        <PasswordForm {...props}/>
      );
    }
    else {
        return (
          <SelectForm {...props}/>
        );
    }
}

export default Forms;