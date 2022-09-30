import {useContext, useEffect} from 'react';
import {Link, NavLink, Route, useHistory} from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import classes from './MainNavigation.module.css';
import UserDetailsButton from "./Buttons/UserDetailsButton";
import LogoutButton from "./Buttons/LogoutButton";
import ListButton from "./Buttons/ListButton";
import BorrowButton from "./Buttons/BorrowButton";
import LendButton from "./Buttons/LendButton";


//Passing the props from LayoutWrapper component
const MainNavigation = ({ setFormS, formS, onClick, onMove, setParticipantListClicked,
                            onDetailsMove, setParticipantDetailsClicked, handleEdit, deleted, setDeleted,
                        setShareItemClicked, onShare, onCloseShare, setLoanItemClicked, onLoan, onCloseLoan}) => {

    console.log(formS)
    const history = useHistory();

    //This component receives the formS prop via LayoutWrapper (parent) when the user presses the submit-button
    //in Profile Form. The state can be used to display navigation content conditionally.
    //However, without the two below useEffect code blocks, the state goes back to null upon refresh
    //The bottom useEffect sets the state, the other useEffect gets it as it render only once and picks up the state
    //from local storage

    useEffect(()=> {
        const data = localStorage.getItem('submission');
        if (data) {
            setFormS(JSON.parse(data))
        }
    },[]);

    useEffect(() => {
            localStorage.setItem("submission", JSON.stringify(formS));
        });

    //Using useContext to manage the login-state
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    //This function uses props to setUserDetailsClicked to false, and logging out the user
    const logoutHandler = () => {
        setFormS(null);
        setParticipantListClicked(false);
        setParticipantDetailsClicked(false);
        setShareItemClicked(false);
        setLoanItemClicked(false)
        setDeleted(false);
        localStorage.removeItem('submission')
        localStorage.removeItem('detailsEdited')
        localStorage.removeItem('jwt')
        localStorage.removeItem('userId')
        authCtx.logout();
        history.push('/')
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

                    {(formS && !deleted) ?
                        <li>
                            <LendButton to='/items'
                                        onShare={onShare}
                            />
                        </li>
                        : null
                    }
                    {(formS && !deleted)  ?
                        <li>
                            <BorrowButton to='/loan'
                                          onLoan={onLoan}
                            />
                        </li>
                        : null
                    }
                    {(formS && !deleted) ?
                        <li>
                            {/*Props are passed down from LayoutWrapper Component*/}
                            <ListButton to='/participants'
                                        onClick={onClick}
                            />
                        </li>
                        : null
                    }
                    {(formS && !deleted) ?
                        <li>
                            {/*Props are passed down from LayoutWrapper Component*/}
                            <UserDetailsButton
                                onEdit={handleEdit}
                            />
                        </li>
                        : null
                    }
                    {isLoggedIn && (
                        <li>
                            {/*Props are passed down from LayoutWrapper Component*/}
                            <LogoutButton to='/userdata'
                                          onClick={logoutHandler}
                                          onMove={onMove}
                                          onDetailsMove={onDetailsMove}
                                          onCloseShare={onCloseShare}
                                          onCloseLoan={onCloseLoan}
                            />
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;