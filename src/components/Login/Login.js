import React, { useState, useReducer, useContext} from 'react';


import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../Store/AuthContext';
import Input from '../UI/Input/Input';


const emailReducer = (state, action) => {

  if(action.type === "USER_INPUT"){
    return {value: action.val , isValid: action.val.includes("@")}
  }
  if(action.type === "INPUT_BLUR"){
    return {value: state.value , isValid: state.value.includes("@")}
  }

  return {value: '', isValid: false}
}

const passwordReducer = (state, action) => {
  if(action.type === "USER_PASSWORD"){
    return {value: action.val , isValid: action.val.trim().length > 6}
  }
  if(action.type === "PASSWORD_BLUR"){
    return {value: state.value , isValid: state.value.trim().length > 6}
  }
  return {value: "", isValid : false}
}

const Login = (props) => {

  const ctx = useContext(AuthContext)
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  })

  const[passwordState, dispacthPassword] = useReducer( passwordReducer, {
    value: "",
    isValid : undefined
  })

// useEffect( () => {

  // const timeoutsystem = setTimeout( () => {
  //   console.log("Effect triggered")
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 0
  //   );

   

  // }, 500)
  
  // return () => {
  //   clearTimeout(timeoutsystem);
  // }

// }, [ enteredEmail, enteredPassword, enteredCollege])

  const emailChangeHandler = (event) => {

    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid && enteredCollege.trim().length > 0
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispacthPassword( {type: "USER_PASSWORD", val: event.target.value});

    setFormIsValid(
      passwordState.isValid && emailState.isValid && enteredCollege.trim().length > 0
    );
  };

  const collegeChangeHandler = (event) =>{
    setEnteredCollege(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 0 && emailState.isValid && passwordState.isValid
    );
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail( { type: "INPUT_BLUR"})

  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispacthPassword( {type: "PASSWORD_BLUR"})
  };

  const validateCollegeHandler = ( ) => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  }

  const submitHandler = (event) => {
    // event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value, enteredCollege);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <Input type={"email"} id={"email"} value={emailState.value} onChange={emailChangeHandler}
            onBlur={validateEmailHandler}/>
          {/* <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          /> */}
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <Input type={"password"} id={"password"} value={passwordState.value} onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}/>
          {/* <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          /> */}
        </div>

        
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College Name</label>
          <Input type={"text"} id={"college"} value={enteredCollege} onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}/>
          
          {/* <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          /> */}
        </div>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}


export default Login;
