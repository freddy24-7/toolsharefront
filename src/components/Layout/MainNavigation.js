import {useContext, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import classes from './MainNavigation.module.css';
import UserDetailsButton from "./Buttons/UserDetailsButton";
import LogoutButton from "./Buttons/LogoutButton";

//Passing the props from Layout component
const MainNavigation = ({ onLogout, setUserDetailsClicked, onClickingUserDetails }) => {

    //Using useContext to manage the login-state
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    //This function uses props to setUserDetailsClicked to false, and logging out the user
    const logoutHandler = () => {
        setUserDetailsClicked(false)
        authCtx.logout();
    };


    return (
        <header className={classes.header}>
            <Link to='/'>
                <div className={classes.logo}>Tool Share</div>
            </Link>
            <nav>
                <ul>
                    {/*Below links and buttons are conditionally displayed depending on login-state*/}
                    {!isLoggedIn && (
                        <li>
                            <NavLink to='/login'>Login</NavLink>
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li>
                            <NavLink to='/register'>Register</NavLink>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <UserDetailsButton to='/userdata' onClick={onClickingUserDetails}/>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <NavLink to='/borrowing'>Spullen lenen?</NavLink>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <NavLink to='/borrowing'>Spullen uitlenen?</NavLink>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <NavLink to='/userlist' >Lijst van deelneemers</NavLink>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            {/*Props are passed down from Layout Component*/}
                            <LogoutButton to='/userdata'
                                          onClick={onLogout}
                                          onClick={logoutHandler}
                            />
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;