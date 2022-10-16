
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css'
import './CSS/Light/LIGHTNavBar.css'
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
import sun from './images/sun.png'
import moon from './images/moon.png'
import { useDropContext } from '../context/Dropdown';

const NavBar = () => {

  const user = useSelector(state => state.session.user)
  const history = useHistory()
  const { toggleDrop, setToggleDrop, dark, setDark } = useDropContext()
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

    if (dark) {
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
    }

    if (!dark) {
      elementArr.push(document.getElementById('LIGHTNavBar_menuID'))
      elementArr.push(document.getElementsByClassName('LIGHTNavBar_dropdown_top')[0])
      elementArr.push(document.getElementsByClassName('LIGHTNavBar_dropdown_mid')[0])
      elementArr.push(document.getElementsByClassName('LIGHTNavBar_dropdown_bottom')[0])
      elementArr.push(document.getElementsByClassName('LIGHTNavBar_profilePicBig')[0])
      elementArr.push(document.getElementsByClassName('LIGHTNavBar_dropdown_username')[0])
      elementArr.push(document.getElementsByClassName('LIGHTNavBar_logout_diff')[0])
      let icos = document.getElementsByClassName('LIGHTNavBar_dropdownIco')
      for (let ele of icos) {
        elementArr.push(ele)
      }
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
      <div className={dark ? 'NavBar_outer' : 'LIGHTNavBar_outer'}>
        <div className={dark ? 'NavBar_left' : 'LIGHTNavBar_left'}>
          <div className={dark ? 'NavBar_logoWrap' : 'LIGHTNavBar_logoWrap'} onClick={redirectHome}>
            <img className={dark ? 'NavBar_logo' : 'LIGHTNavBar_logo'} src={logo}></img>
            <img className={dark ? 'NavBar_logoTitle' : 'LIGHTNavBar_logoTitle'} src={sitetitle}></img>
          </div>
          <div onClick={redirectHome} className={dark ? 'NavBar_home' : 'LIGHTNavBar_home'}>Home</div>
          <div onClick={redirectMyStories} className={dark ? 'NavBar_myStories' : 'LIGHTNavBar_myStories'}> My Stories</div>
        </div>
        <div className={dark ? 'NavBar_right' : 'LIGHTNavBar_right'}>
          {/* <img src={search} className={dark ? 'NavBar_search' : 'LIGHTNavBar_search'}></img> */}
          <div onClick={() => setDark(!dark)} className={dark ? 'NavBar_watchlistContainer' : 'LIGHTNavBar_watchlistContainer'}>
            {dark && <img src={sun} className={dark ? 'NavBar_watchlist' : 'LIGHTNavBar_watchlist'}></img>}
            {!dark && <img src={moon} className={dark ? 'NavBar_watchlist' : 'LIGHTNavBar_watchlist'}></img>}
          </div>
          <div onClick={redirectList} className={dark ? 'NavBar_watchlistContainer' : 'LIGHTNavBar_watchlistContainer'}>
            <img src={watchlist} className={dark ? 'NavBar_watchlist' : 'LIGHTNavBar_watchlist'}></img>
          </div>
          <div
            className={dark ? (!toggleDrop ? 'NavBar_profileDrop' : 'NavBar_profileDropDark') : (!toggleDrop ? 'LIGHTNavBar_profileDrop' : 'LIGHTNavBar_profileDropDark')}
            onClick={() => setToggleDrop(!toggleDrop)}
          >
            <img src={user ? userPic : noUser} className='NavBar_profilePic'></img>
            <img src={dropdown} className='NavBar_dropdown'></img>
          </div>
          {toggleDrop && <div id={dark ? 'NavBar_menuID' : 'LIGHTNavBar_menuID'} className={dark ? 'NavBar_menu' : 'LIGHTNavBar_menu'}>
            <ul className={dark ? 'NavBar_ul' : 'LIGHTNavBar_ul'}>
              <div className={dark ? 'NavBar_dropdown_top' : 'LIGHTNavBar_dropdown_top'}>
                <img className={dark ? 'NavBar_profilePicBig' : 'LIGHTNavBar_profilePicBig'} src={user ? userPic : noUser}></img>
                <div className={dark ? 'NavBar_dropdown_username' : 'LIGHTNavBar_dropdown_username'}>{user ? user.username : 'Guest'}</div>
              </div>
              <div className={dark ? 'NavBar_dropdown_mid' : 'LIGHTNavBar_dropdown_mid'}>
                <li onClick={() => {
                  setToggleDrop(false)
                  redirectList()
                  return
                }} className={dark ? 'NavBar_li' : 'LIGHTNavBar_li'}>
                  <img className={dark ? 'NavBar_dropdownIco' : 'LIGHTNavBar_dropdownIco'} src={watchlist}></img>
                  <div className={dark ? 'NavBar_dropdownText' : 'LIGHTNavBar_dropdownText'}>
                    Watchlist
                  </div>
                </li >
                <li onClick={() => {
                  setToggleDrop(false)
                  redirectCrunchList()
                  return
                }} className={dark ? 'NavBar_li' : 'LIGHTNavBar_li'}>
                  <img className={dark ? 'NavBar_dropdownIco' : 'LIGHTNavBar_dropdownIco'} src={list}></img>
                  <div className={dark ? 'NavBar_dropdownText' : 'LIGHTNavBar_dropdownText'} >
                    Crunchylists
                  </div>
                </li >
                <li onClick={() => {
                  setToggleDrop(false)
                  redirectHome()
                  return
                }} className={dark ? 'NavBar_li' : 'LIGHTNavBar_li'}>
                  <img className={dark ? 'NavBar_dropdownIco' : 'LIGHTNavBar_dropdownIco'} src={home}></img>
                  <div className={dark ? 'NavBar_dropdownText' : 'LIGHTNavBar_dropdownText'}>
                    Home
                  </div>
                </li >
              </div>
              <div className={dark ? 'NavBar_dropdown_bottom' : 'LIGHTNavBar_dropdown_bottom'}>
                {!user && <li className={dark ? 'NavBar_li' : 'LIGHTNavBar_li'} onClick={() => {
                  setToggleDrop(false)
                  redirectLogin()
                  return
                }}>
                  <img className={dark ? 'NavBar_dropdownIco' : 'LIGHTNavBar_dropdownIco'} src={login}></img>
                  <div className={dark ? 'NavBar_dropdownText' : 'LIGHTNavBar_dropdownText'} >
                    Login
                  </div>
                </li>}

                {user && <li className={dark ? 'NavBar_logout_diff' : 'LIGHTNavBar_logout_diff'}>
                  <img className={dark ? 'NavBar_dropdownIco' : 'LIGHTNavBar_dropdownIco'} src={logout}></img>
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
