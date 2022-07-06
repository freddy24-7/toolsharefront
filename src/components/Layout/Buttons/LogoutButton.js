import React from 'react';
import classes from "./Button.module.css";


//Passing the props into the logout
//Props-drilling used to pass the onLogout prop all the way down from Layout component
const LogoutButton = ( {onClick, onLogout} ) => {
    return (
        <button className={classes.button}
                onClick={onClick}
                onChange={onLogout}
        >
            <span>Logout</span>
        </button>
    );
};

export default LogoutButton;