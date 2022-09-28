import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import '../CSS/LogoutButton.css'
import { useDropContext } from '../../context/Dropdown';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const { toggleDrop, setToggleDrop } = useDropContext()


  const onLogout = async (e) => {
    setToggleDrop(false)
    await dispatch(logout());
  };

  return <button className='LogoutButton' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
