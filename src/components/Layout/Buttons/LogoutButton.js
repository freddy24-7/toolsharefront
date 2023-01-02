import React from 'react';
import classes from "./Button.module.css";


//Passing the props into the logout component
//Props-drilling used to pass the onLogout prop all the way down from LayoutWrapper component
const LogoutButton = ( {onClick, onMove, onDetailsMove } ) => {
    return (
        <button className={classes.button}
                onClick={onMove}
                onClick={onDetailsMove}
                onClick={onClick}
        >
            <span>Logout</span>
        </button>
    );
};

export default LogoutButton;