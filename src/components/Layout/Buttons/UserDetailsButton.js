import React from 'react';
import classes from './Button.module.css'

const UserDetailsButton = ( {onClick} ) => {
    return (

        // Prop-drillingThe onClick prop fires the UserDetailFuntion in the Layout component
        <button className={classes.button} onClick={onClick}>
            <span>Edit my details</span>
        </button>
    );
};

export default UserDetailsButton;