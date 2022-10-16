import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '../CSS/LoginForm.css'
import '../CSS/Light/LIGHTLoginForm.css'
import { useDropContext } from '../../context/Dropdown';

const LoginForm = () => {
  const { dark } = useDropContext()
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
      setEmail('')
      setPassword('')
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = () => {
    setEmail('demo@aa.io')
    setPassword('password')

  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className={dark ? 'LoginForm_formWrap' : 'LIGHTLoginForm_formWrap'}>
      <form className={dark ? 'LoginForm_form' : 'LIGHTLoginForm_form'} onSubmit={onLogin}>
        <div className={dark ? 'LoginForm_topformWrap' : 'LIGHTLoginForm_topformWrap'}>
          <h1 className={dark ? 'LoginForm_title' : 'LIGHTLoginForm_title'}>Log In</h1>
          <div className={dark ? 'LoginForm_subtitle' : 'LIGHTLoginForm_subtitle'}>Already have an account? Log in below.</div>
        </div>
        {errors && <div className={dark ? 'LoginForm_error' : 'LIGHTLoginForm_error'}>Incorrect login information</div>}
        <div className={dark ? 'LoginForm_grid' : 'LIGHTLoginForm_grid'}>
          <div className={dark ? 'LoginForm_inputWrap' : 'LIGHTLoginForm_inputWrap'}>
            <label className={dark ? 'LoginForm_label' : 'LIGHTLoginForm_label'} htmlFor='email'>Email</label>
            <input
              className={dark ? 'LoginForm_input' : 'LIGHTLoginForm_input'}
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            // required={true}
            />
          </div>
          <div className={dark ? 'LoginForm_inputWrap' : 'LIGHTLoginForm_inputWrap'}>
            <label className={dark ? 'LoginForm_label' : 'LIGHTLoginForm_label'} htmlFor='password'>Password</label>
            <input
              className={dark ? 'LoginForm_input' : 'LIGHTLoginForm_input'}
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            // required={true}
            />
          </div>
          <button className={dark ? 'LoginForm_submit' : 'LIGHTLoginForm_submit'} type='submit'>Login</button>
          <button className={dark ? 'LoginForm_demo' : 'LIGHTLoginForm_demo'} onClick={(e) => demoLogin(e)}>Demo</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
