import React from 'react';
import { Route, Link } from 'react-router-dom';
import toDo from '../../icons/to-do.png'
import './Nav.css'

const Nav = () => {
    return (
        <nav>
            <Route exact path='/dashboard' render={() => 
                <Link to={'/'} className="link">
                    <button>Home</button>
                </Link>
            }/>

            <Route exact path='/' render={() => 
                <Link to={'/dashboard'} className="link">
                    <button><img src={toDo} className='icon'></img></button>
                </Link>
            }/>

            {/* <button>FAQ?</button> */}
        </nav>
    )
}

export default Nav;