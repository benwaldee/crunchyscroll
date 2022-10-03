import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginSignupPage from './components/LoginSignupPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Homepage from './components/Homepage'
import MyStories from './components/MyStories'
import StoryByID from './components/StoryByID'
import { authenticate } from './store/session';


function App() {

  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login-signup' exact={true}>
          <div className='pageWrap'>
            <LoginSignupPage />
            <Footer />
          </div>
        </Route>
        <Route path='/' exact={true} >
          <div className='pageWrap'>
            <NavBar />
            <Homepage />
            <Footer />
          </div>
        </Route>
        <Route path='/mystories' exact={true} >
          <div className='pageWrap'>
            <NavBar />
            <MyStories />
            <Footer />
          </div>
        </Route>
        <Route path='/stories/:id' exact={true}  >
          <div className='pageWrap'>
            <NavBar />
            <StoryByID />
            <Footer />
          </div>
        </Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
