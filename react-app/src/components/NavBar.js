
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css'
import { useHistory } from 'react-router-dom';
import logo from './images/transpo-scroll.png'
import sitetitle from './images/crunchywords.png'
import search from './images/search.png'
import watchlist from './images/watchlist.png'
import userPic from './images/User.png'
import noUser from './images/NoUser.png'
import dropdown from './images/dropdown.png'
//dropdown stuff
import list from './images/list.png'
import home from './images/home.png'
import login from './images/login.png'
import logout from './images/logout.png'
import { useDropContext } from '../context/Dropdown';

const NavBar = () => {

  const user = useSelector(state => state.session.user)
  const history = useHistory()
  const { toggleDrop, setToggleDrop } = useDropContext()
  const { watchlistClicked, setWatchlistClicked } = useDropContext()

  const redirectHome = () => {
    history.push('/')
  }

  const redirectLogin = () => {
    history.push('/login-signup')
  }

  const redirectMyStories = () => {
    if (!user) {
      history.push('/login-signup')
    } else { history.push('/mystories') }
  }

  const redirectList = () => {
    if (!user) {
      history.push('/login-signup')
    } else {
      setWatchlistClicked(true)
      history.push('/lists')
    }
  }

  const redirectCrunchList = () => {
    if (!user) {
      history.push('/login-signup')
    } else {
      setWatchlistClicked(false)
      history.push('/lists')
    }
  }

  const closeDrop = () => {
    setToggleDrop(false)
  }

  useEffect(() => {
    if (!toggleDrop) return;

    //add elements in dropdown to avoid closing
    let elementArr = []
    elementArr.push(document.getElementById('NavBar_menuID'))
    elementArr.push(document.getElementsByClassName('NavBar_dropdown_top')[0])
    elementArr.push(document.getElementsByClassName('NavBar_dropdown_mid')[0])
    elementArr.push(document.getElementsByClassName('NavBar_dropdown_bottom')[0])
    elementArr.push(document.getElementsByClassName('NavBar_profilePicBig')[0])
    elementArr.push(document.getElementsByClassName('NavBar_dropdown_username')[0])
    elementArr.push(document.getElementsByClassName('NavBar_logout_diff')[0])
    let icos = document.getElementsByClassName('NavBar_dropdownIco')
    for (let ele of icos) {
      elementArr.push(ele)
    }



    const closeMenu = (e) => {
      for (let ele of elementArr) {
        if (e.target === ele) { return }
      }
      setToggleDrop(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [toggleDrop]);


  return (
    <>
      <div className='NavBar_outer'>
        <div className='NavBar_left'>
          <div className='NavBar_logoWrap' onClick={redirectHome}>
            <img className='NavBar_logo' src={logo}></img>
            <img className='NavBar_logoTitle' src={sitetitle}></img>
          </div>
          <div onClick={redirectHome} className='NavBar_home'>Home</div>
          <div onClick={redirectMyStories} className='NavBar_myStories'> My Stories</div>
        </div>
        <div className='NavBar_right'>
          {/* <img src={search} className='NavBar_search'></img> */}
          <div onClick={redirectList} className='NavBar_watchlistContainer'>
            <img src={watchlist} className='NavBar_watchlist'></img>
          </div>
          <div
            className={!toggleDrop ? 'NavBar_profileDrop' : 'NavBar_profileDropDark'}
            onClick={() => setToggleDrop(!toggleDrop)}
          >
            <img src={user ? userPic : noUser} className='NavBar_profilePic'></img>
            <img src={dropdown} className='NavBar_dropdown'></img>
          </div>
          {toggleDrop && <div id='NavBar_menuID' className='NavBar_menu'>
            <ul className='NavBar_ul'>
              <div className='NavBar_dropdown_top'>
                <img className='NavBar_profilePicBig' src={user ? userPic : noUser}></img>
                <div className='NavBar_dropdown_username'>{user ? user.username : 'Guest'}</div>
              </div>
              <div className='NavBar_dropdown_mid'>
                <li onClick={() => {
                  setToggleDrop(false)
                  redirectList()
                  return
                }} className='NavBar_li'>
                  <img className='NavBar_dropdownIco' src={watchlist}></img>
                  <div className='NavBar_dropdownText'>
                    Watchlist
                  </div>
                </li >
                <li onClick={() => {
                  setToggleDrop(false)
                  redirectCrunchList()
                  return
                }} className='NavBar_li'>
                  <img className='NavBar_dropdownIco' src={list}></img>
                  <div className='NavBar_dropdownText' >
                    Crunchylists
                  </div>
                </li >
                <li onClick={() => {
                  setToggleDrop(false)
                  redirectHome()
                  return
                }} className='NavBar_li'>
                  <img className='NavBar_dropdownIco' src={home}></img>
                  <div className='NavBar_dropdownText'>
                    Home
                  </div>
                </li >
              </div>
              <div className='NavBar_dropdown_bottom'>
                {!user && <li className='NavBar_li' onClick={() => {
                  setToggleDrop(false)
                  redirectLogin()
                  return
                }}>
                  <img className='NavBar_dropdownIco' src={login}></img>
                  <div className='NavBar_dropdownText' >
                    Login
                  </div>
                </li>}

                {user && <li className='NavBar_logout_diff'>
                  <img className='NavBar_dropdownIco' src={logout}></img>
                  <LogoutButton />
                </li>}
              </div>
            </ul>
          </div>}
        </div>
      </div>

    </>
  );
}

export default NavBar;
