import { useContext } from 'react';
import {Link, NavLink} from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import classes from './MainNavigation.module.css';


const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    };

    return (
        <header className={classes.header}>
            <Link to='/'>
                <div className={classes.logo}>Tool Share</div>
            </Link>
            <nav>
                <ul>
                    {!isLoggedIn && (
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <NavLink to='/lending'>Spullen uitlenen?</NavLink>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <NavLink to='/borrowing'>Spullen lenen?</NavLink>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <NavLink to='/borrowing'>Lijst van deelneemers</NavLink>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;