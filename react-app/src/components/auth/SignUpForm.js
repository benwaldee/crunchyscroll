import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../CSS/SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: ""
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    let newErr = {}

    if (username.length < 3 || username.length > 30) {
      setUsername("")
      newErr.username = "Username must be 3-30 characters"
    }
    if (!email.includes("@") || !email.includes(".")) {
      setEmail("")
      newErr.email = "Email in use or invalid."

    }
    if (password !== repeatPassword) {
      setRepeatPassword("")
      newErr.repeatPassword = "Passwords must match"
    }

    // lengths
    if (username.length < 1) newErr.username = "Please enter a username."
    if (email.length < 1) newErr.email = "Please enter an email."
    if (password.length < 1) newErr.password = "Please enter a password."
    if (repeatPassword.length < 1) newErr.repeatPassword = "Please confirm your password."

    setErrors(newErr)

    if (Object.values(newErr).length > 0) {
      newErr = {}
      return
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors({ email: "Email in use or invalid." })
      }

    }
  };


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };


  if (user) {
    return <Redirect to='/' />;
  }


  return (
    <form className='SignUpForm_form' onSubmit={onSignUp}>
      <h1 className='SignUpForm_title'>Sign Up for a Free Account</h1>
      <div className='SignUpForm_subtitle'>Please join Crunchyscroll! It's only one click away!</div>
      <div className='SignUpForm_innerFormGrid'>
        <div className='SignUpForm_inputWrap'>
          <label className='SignUpForm_label'>User Name</label>
          <input
            className='SignUpForm_input'
            type='text'
            name='username'
            onChange={(e) => {

              updateUsername(e)
              return
            }}
            value={username}
          // required={true}
          ></input>
          {errors?.username && <div className='SignUpForm_error'>{errors.username}</div>}
        </div>
        <div className='SignUpForm_inputWrap'>
          <label className='SignUpForm_label'>Email</label>
          <input
            className='SignUpForm_input'
            type='text'
            name='email'
            onChange={(e) => {

              updateEmail(e)
              return
            }}
            value={email}
          // required={true}
          ></input>
          {errors?.email && <div className='SignUpForm_error'>{errors.email}</div>}
        </div>
        <div className='SignUpForm_inputWrap'>
          <label className='SignUpForm_label'>Password</label>
          <input
            className='SignUpForm_input'
            type='password'
            name='password'
            onChange={(e) => {

              updatePassword(e)
              return
            }}
            value={password}
          // required={true}
          ></input>
          {errors?.password && <div className='SignUpForm_error'>{errors.password}</div>}
        </div>
        <div className='SignUpForm_inputWrap'>
          <label className='SignUpForm_label'>Confirm Password</label>
          <input
            className='SignUpForm_input'
            type='password'
            name='repeat_password'
            onChange={(e) => {

              updateRepeatPassword(e)
              return
            }}
            value={repeatPassword}
          // required={true}
          ></input>
          {errors?.repeatPassword && <div className='SignUpForm_error'>{errors.repeatPassword}</div>}
        </div>
        <button className='SignUpForm_submit' type='submit'>Create Account</button>
      </div>
    </form >

  );
};

export default SignUpForm;
