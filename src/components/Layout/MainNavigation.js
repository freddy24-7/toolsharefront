import React, {useContext} from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import classes from './MainNavigation.module.css';
import UserDetailsButton from "./Buttons/UserDetailsButton";
import LogoutButton from "./Buttons/LogoutButton";
import ListButton from "./Buttons/ListButton";
import BorrowButton from "./Buttons/BorrowButton";
import LendButton from "./Buttons/LendButton";
import applicationLogo from "../../assets/1667993269612blob.jpg";


//Passing the props from LayoutWrapper component
const MainNavigation = ({ setFormS, formS, onClick, onMove, setParticipantListClicked,
                            onDetailsMove, setParticipantDetailsClicked, handleEdit, deleted, setDeleted,
                        setShareItemClicked, onCloseShare, setOwnerDetailsClicked, setVisitedOwnerPageClicked,
                            setLoanItemClicked, onLoan, onCloseLoan, shareItemClickHandler,
                        visitedOwnerPageClicked}) => {

    //history-hook used for navigation
    const history = useHistory();

    //Using useContext to manage the login-state
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    //This function uses props to setUserDetailsClicked to false, and logging out the user
    const logoutHandler = () => {
        setFormS(false);
        setParticipantListClicked(false);
        setParticipantDetailsClicked(false);
        setShareItemClicked(false);
        setLoanItemClicked(false)
        setDeleted(false);
        setOwnerDetailsClicked(false);
        setVisitedOwnerPageClicked(false);
        localStorage.removeItem('submission')
        localStorage.removeItem('detailsEdited')
        localStorage.removeItem('jwt')
        localStorage.removeItem('userId')
        localStorage.removeItem('photo')
        localStorage.removeItem('ownerId')
        localStorage.removeItem('token')
        authCtx.logout();
        history.push('/')
        console.log(visitedOwnerPageClicked)
        console.log(formS)
    };

    return (
        <header className={classes.header}>
            <div >
                <img className={classes.logo} src={applicationLogo} alt="logo" height={83} width={85}
                />
            </div>
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
                                        onShare={shareItemClickHandler}
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