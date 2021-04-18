import React from 'react';
import { Route, Link } from 'react-router-dom';
import toDo from '../../icons/to-do.png'
import pear from '../../icons/pear.png'
import pearFull from '../../icons/pearFull.png'
import addReq from '../../icons/add-req.png'
import home from '../../icons/home.png'
import './Nav.css'

const Nav = ({resetFilteredReviews, error}) => {
    return (
        <nav>
            <div className='app-logo'>
              <img src={pear} alt='pear-logo' className='pear-logo bite'></img>
              <img src={pearFull} alt='pear-logo' className='pear-logo full'></img>
              <h1>Pear</h1>
            </div>
            {error && <h2 className="message">⚠️ {error}</h2>}
            <div className='nav-buttons'>
            <Route exact path='/dashboard' render={() => 
              <>
                <Link to={'/'} className="link">
                    <button className='logo-button' onClick={() => resetFilteredReviews()}><img className='icon' src={home} alt='home' id='home'></img></button>
                </Link>
                <Link to={'/new'} className="link">
                <button className='logo-button' id='addReq'><img className='icon' src={addReq} alt='new request'></img>t</button>
                </Link>
              </>
            }/>

            <Route exact path='/' render={() => 
              <>
                <Link to={'/dashboard'} className="link">
                    <button className='logo-button'><img className='icon' src={toDo} alt='home'></img></button>
                </Link>
                <Link to={'/new'} className="link">
                    <button className='logo-button' id='addReq'><img className='icon' src={addReq} alt='new request'></img></button>
                </Link>
              </>
            }/>
  
            <Route exact path='/new' render={() => 
              <>
                <Link to={'/'} className="link">
                  <button className='logo-button' onClick={() => resetFilteredReviews()}><img className='icon' src={home} alt='home' id='home'></img></button>
                </Link>
                <Link to={'/dashboard'} className="link">
                    <button className='logo-button'><img src={toDo} id='dashBoard' className='icon' alt='dashboard'></img></button>
                </Link>
              </>
            }/>
            </div>
            {/* <button>FAQ?</button> */}
        </nav>
    )
}

export default Nav;