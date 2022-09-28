
import React, { useState } from 'react';
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

const NavBar = () => {

  const user = useSelector(state => state.session.user)
  const history = useHistory()
  const [toggleDrop, setToggleDrop] = useState(false)

  const redirectHome = () => {
    history.push('/')
  }

  return (
    <>
      <div className='NavBar_outer'>
        <div className='NavBar_left'>
          <div className='NavBar_logoWrap' onClick={redirectHome}>
            <img className='NavBar_logo' src={logo}></img>
            <img className='NavBar_logoTitle' src={sitetitle}></img>
          </div>
          <div className='NavBar_home'>Home</div>
          <div className='NavBar_myStories'> My Stories</div>
        </div>
        <div className='NavBar_right'>
          {/* <img src={search} className='NavBar_search'></img> */}
          <div className='NavBar_watchlistContainer'>
            <img src={watchlist} className='NavBar_watchlist'></img>
          </div>
          <div
            className={!toggleDrop ? 'NavBar_profileDrop' : 'NavBar_profileDropDark'}
            onClick={() => setToggleDrop(!toggleDrop)}
          >
            <img src={user ? userPic : noUser} className='NavBar_profilePic'></img>
            <img src={dropdown} className='NavBar_dropdown'></img>
          </div>
          {toggleDrop && <div className='NavBar_menu'>
            <ul className='NavBar_ul'>
              <li className='NavBar_li'>
                <NavLink to='/' exact={true} activeClassName='active'>
                  Home
                </NavLink>
              </li >
              {!user && <li className='NavBar_li'>
                <NavLink to='/login-signup' exact={true} activeClassName='active'>
                  Login/Signup
                </NavLink>
              </li>}

              {user && <li className='NavBar_li'>
                <LogoutButton />
              </li>}
            </ul>
          </div>}
        </div>
      </div>

    </>
  );
}

export default NavBar;
