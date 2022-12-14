import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginSignupPage from './components/LoginSignupPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Homepage from './components/Homepage'
import MyStories from './components/MyStories'
import StoryByID from './components/StoryByID'
import FourOhFour from './components/FourOhFour'
import Lists from './components/Lists'
import ListByID from './components/ListByID'
import { authenticate } from './store/session';
import { useDropContext } from './context/Dropdown';

function App() {
  const { dark } = useDropContext()
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
          <div className={dark ? 'pageWrap' : 'LIGHTpageWrap'}>
            <LoginSignupPage />
            <Footer />
          </div>
        </Route>
        <Route path='/' exact={true} >
          <div className={dark ? 'pageWrap' : 'LIGHTpageWrap'}>
            <NavBar />
            <Homepage />
            <Footer />
          </div>
        </Route>
        <Route path='/lists' exact={true} >
          <div className={dark ? 'pageWrap' : 'LIGHTpageWrap'}>
            <NavBar />
            <Lists />
            <Footer />
          </div>
        </Route>
        <Route path='/lists/:id' exact={true} >
          <div className={dark ? 'pageWrap' : 'LIGHTpageWrap'}>
            <NavBar />
            <ListByID />
            <Footer />
          </div>
        </Route>
        <Route path='/mystories' exact={true} >
          <div className={dark ? 'pageWrap' : 'LIGHTpageWrap'}>
            <NavBar />
            <MyStories />
            <Footer />
          </div>
        </Route>
        <Route path='/stories/:id' exact={true}  >
          <div className={dark ? 'pageWrap' : 'LIGHTpageWrap'}>
            <NavBar />
            <StoryByID />
            <Footer />
          </div>
        </Route>
        <Route  >
          <div className={dark ? 'pageWrap' : 'LIGHTpageWrap'}>
            <NavBar />
            <FourOhFour />
            <Footer />
          </div>
        </Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
