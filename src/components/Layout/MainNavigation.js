import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
        // optional: redirect the user
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
                            <Link to='/profile'>Profile</Link>
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