import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '../CSS/LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='LoginForm_formWrap'>
      <form className='LoginForm_form' onSubmit={onLogin}>
        <h1 className='LoginForm_title'>Log In</h1>
        <div className='LoginForm_subtitle'>Already have an account? Log in below.</div>
        {errors && <div className='LoginForm_error'>Incorrect login information</div>}
        <div className='LoginForm_grid'>
          <div className='LoginForm_inputWrap'>
            <label className='LoginForm_label' htmlFor='email'>Email</label>
            <input
              className='LoginForm_input'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            // required={true}
            />
          </div>
          <div className='LoginForm_inputWrap'>
            <label className='LoginForm_label' htmlFor='password'>Password</label>
            <input
              className='LoginForm_input'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            // required={true}
            />
          </div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
