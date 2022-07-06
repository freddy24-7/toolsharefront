import React from 'react';
import classes from './Button.module.css'

const UserDetailsButton = ( {onClick} ) => {
    return (

        <button className={classes.button} onClick={onClick}>
            <span>Edit mijn details</span>
        </button>
    );
};

export default UserDetailsButton;